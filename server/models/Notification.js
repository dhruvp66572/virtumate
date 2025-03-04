const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['EVENT_REMINDER', 'CONNECTION_REQUEST', 'MESSAGE', 'SYSTEM', 'EVENT_UPDATE'], 
    required: true 
  },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  readAt: Date,
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
