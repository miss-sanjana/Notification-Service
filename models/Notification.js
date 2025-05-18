// const mongoose = require('mongoose');

// const notificationSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   type: { type: String, enum: ['email', 'sms', 'inapp'] },
//   message: String,
//   status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
//   createdAt: { type: Date, default: Date.now }
// });


// module.exports = mongoose.model('Notification', notificationSchema);


const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['email', 'sms', 'in-app'], required: true },
  message: String,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  retries: { type: Number, default: 0 }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

module.exports = mongoose.model('Notification', notificationSchema);
