const Notification = require('../models/Notification');
const User = require('../models/User');

// Get user notifications
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort('-createdAt')
      .populate('senderId', 'name')
      .populate('eventId', 'title');

    res.json({
      status: 'success',
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      status: 'error', 
      message: error.message
    });
  }
};

// Mark notification as read
const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { read: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found'
      });
    }

    res.json({
      status: 'success',
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Mark all notifications as read
const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, read: false },
      { read: true, readAt: new Date() }
    );

    res.json({
      status: 'success',
      message: 'All notifications marked as read'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!notification) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update notification settings
const updateNotificationSettings = async (req, res) => {
  try {
    const { emailNotifications, pushNotifications } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        'preferences.emailNotifications': emailNotifications,
        'preferences.pushNotifications': pushNotifications
      },
      { new: true }
    );

    res.json({
      status: 'success',
      data: user.preferences
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Send test notification
const sendTestNotification = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    await Notification.create({
      userId,
      type: 'TEST',
      content: 'This is a test notification',
      read: false
    });
    
    if (user.preferences.emailNotifications) {
      await EmailService.sendEmail({
        to: user.email,
        subject: 'Test Notification',
        template: 'test-notification',
        context: {
          userName: user.firstName,
          notificationContent: 'This is a test notification'
        }
      });
    }

    if (user.preferences.pushNotifications) {
      await PushService.sendPush(user._id, {
        title: 'Test Notification',
        body: 'This is a test notification',
        data: {
          type: 'TEST'
        }
      }); 
    }

    res.json({
      status: 'success',
      message: 'Test notification sent successfully'
    });   
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  updateNotificationSettings,
  sendTestNotification
};
