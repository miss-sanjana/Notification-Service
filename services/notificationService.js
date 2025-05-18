const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendNotification = async (notification) => {
  switch (notification.type) {
    case 'email':
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'recipient@example.com', // Ideally fetch from DB
        subject: 'New Notification',
        text: notification.message,
      });
      break;

    case 'sms':
      console.log(`[SMS]: ${notification.message}`);
      break;

    case 'inapp':
      console.log(`[In-App]: ${notification.message}`);
      break;

    default:
      throw new Error('Unknown notification type');
  }
};
