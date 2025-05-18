const mongoose = require('mongoose');
const Notification = require('./models/Notification');

mongoose.connect('mongodb://localhost:27017/notificationsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Worker connected to MongoDB');
  startWorker();
}).catch(err => {
  console.error('Worker MongoDB connection error:', err);
});

async function startWorker() {
  setInterval(async () => {
    const pendingNotifications = await Notification.find({ status: 'pending' });

    for (let notif of pendingNotifications) {
      try {
        // Simulate sending based on type
        console.log(`Sending ${notif.type} to user ${notif.userId}: "${notif.message}"`);

        // Simulate failure randomly
        const success = Math.random() > 0.3; // 70% success rate

        if (success) {
          notif.status = 'sent';
          await notif.save();
          console.log(`✅ Sent ${notif.type} notification to user ${notif.userId}`);
        } else {
          notif.retries = (notif.retries || 0) + 1;
          if (notif.retries >= 3) {
            notif.status = 'failed';
            console.log(`❌ Failed to send ${notif.type} after 3 retries`);
          } else {
            console.log(`⚠️ Retry ${notif.retries} for ${notif.type}`);
          }
          await notif.save();
        }

      } catch (err) {
        console.error(`❌ Error processing notification ${notif._id}:`, err);
      }
    }
  }, 5000); // check every 5 seconds
}
