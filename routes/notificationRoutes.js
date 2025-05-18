const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');
const amqp = require('amqplib');

let channel, connection;

// Connect to RabbitMQ
async function connectQueue() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('notificationQueue');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
}

connectQueue();

// === Routes ===

// Create user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send notification
router.post('/notifications', async (req, res) => {
  const { userId, type, message } = req.body;

  if (!userId || !type || !message) {
    return res.status(400).json({ error: 'userId, type, and message are required' });
  }

  const notification = new Notification({ userId, type, message });

  try {
    await notification.save();

    const payload = {
      userId,
      type,
      message
    };

    if (channel) {
      channel.sendToQueue('notificationQueue', Buffer.from(JSON.stringify(payload)));
    }

    res.status(201).json({ message: 'Notification queued', notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user notifications
router.get('/users/:id/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
