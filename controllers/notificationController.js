const Notification = require('../models/Notification');
const notificationService = require('../services/notificationService');
const queueService = require('../services/queueService');

exports.sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;

  if (!userId || !type || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const notification = new Notification({ userId, type, message });

  try {
    await notification.save();
    await queueService.sendToQueue(notification); // Send to RabbitMQ
    res.status(200).json({ message: 'Notification queued' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
