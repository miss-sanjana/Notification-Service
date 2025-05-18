const amqp = require('amqplib');
const Notification = require('../models/Notification');
const notificationService = require('./notificationService');

const QUEUE = 'notifications';

exports.sendToQueue = async (notification) => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE);
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(notification)));
};

exports.consumeQueue = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE);
  console.log("Waiting for messages in queue...");

  channel.consume(QUEUE, async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      try {
        await notificationService.sendNotification(data);
        await Notification.findByIdAndUpdate(data._id, { status: 'sent' });
        channel.ack(msg);
      } catch (err) {
        console.error("Error sending notification:", err.message);
        await Notification.findByIdAndUpdate(data._id, { status: 'failed' });
        // Optional retry mechanism can be added here
        channel.ack(msg);
      }
    }
  });
};
