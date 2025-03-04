const express = require('express');
const router = express.Router();
const { protect } = require('../module/auth');
const {
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead, 
  deleteNotification,
  updateNotificationSettings,
  sendTestNotification
} = require('../handlers/notificationHandler');

// All routes require authentication
router.use(protect);

// Get user notifications
router.get('/notifications', getUserNotifications);

// Mark notification as read
router.put('/notifications/:id/read', markNotificationRead);

// Mark all notifications as read
router.put('/notifications/read-all', markAllNotificationsRead);

// Delete notification
router.delete('/notifications/:id', deleteNotification);

// Update notification preferences
router.put('/notifications/settings', updateNotificationSettings);

// Send test notification
router.post('/notifications/test', sendTestNotification);



module.exports = router;
