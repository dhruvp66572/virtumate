const Event = require('../models/Event');
const User = require('../models/User');
const Notification = require('../models/Notification');
const EmailService = require('../services/emailService');
const PushService = require('../services/pushService');
const { formatDate } = require('../utils/dateUtils');

const NotificationService = {
  // Send event reminder to registered attendees
  async sendEventReminders(eventId, hoursBeforeEvent) {
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event not found');
      
      // Get all registered attendees
      const attendees = event.registeredAttendees.map(attendee => attendee.userId);
      
      // Fetch user details for all attendees
      const users = await User.find({ _id: { $in: attendees } });
      
      // Prepare notification content
      const notificationContent = `Reminder: "${event.title}" starts in ${hoursBeforeEvent} hours.`;
      
      // Send notifications to each user
      for (const user of users) {
        // Create in-app notification
        await Notification.create({
          userId: user._id,
          type: 'EVENT_REMINDER',
          content: notificationContent,
          eventId: event._id,
          read: false
        });
        
        // Send email if user has email notifications enabled
        if (user.preferences.emailNotifications) {
          await EmailService.sendEmail({
            to: user.email,
            subject: `Reminder: ${event.title}`,
            template: 'event-reminder',
            context: {
              userName: user.firstName,
              eventName: event.title,
              eventTime: formatDate(event.startTime),
              joinLink: event.meetingDetails.joinUrl,
              hoursRemaining: hoursBeforeEvent
            }
          });
        }
        
        // Send push notification if enabled
        if (user.preferences.pushNotifications) {
          await PushService.sendPush(user._id, {
            title: `Event Reminder: ${event.title}`,
            body: `Starting in ${hoursBeforeEvent} hours`,
            data: {
              eventId: event._id.toString(),
              type: 'EVENT_REMINDER'
            }
          });
        }
      }
      
      console.log(`Sent ${hoursBeforeEvent}-hour reminders for event: ${event.title}`);
      return true;
    } catch (error) {
      console.error('Failed to send event reminders:', error);
      throw error;
    }
  },

  // Send notification when event status changes
  async sendEventStatusUpdate(eventId, newStatus) {
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event not found');

      const attendees = event.registeredAttendees.map(attendee => attendee.userId);
      const users = await User.find({ _id: { $in: attendees } });

      const notificationContent = `Event "${event.title}" status has been updated to ${newStatus}`;

      for (const user of users) {
        await Notification.create({
          userId: user._id,
          type: 'EVENT_STATUS_UPDATE',
          content: notificationContent,
          eventId: event._id,
          read: false
        });

        if (user.preferences.emailNotifications) {
          await EmailService.sendEmail({
            to: user.email,
            subject: `Event Status Update: ${event.title}`,
            template: 'event-status-update',
            context: {
              userName: user.firstName,
              eventName: event.title,
              newStatus: newStatus
            }
          });
        }

        if (user.preferences.pushNotifications) {
          await PushService.sendPush(user._id, {
            title: `Event Status Update: ${event.title}`,
            body: notificationContent,
            data: {
              eventId: event._id.toString(),
              type: 'EVENT_STATUS_UPDATE'
            }
          });
        }
      }

      return true;
    } catch (error) {
      console.error('Failed to send event status updates:', error);
      throw error;
    }
  }
};

module.exports = NotificationService;
