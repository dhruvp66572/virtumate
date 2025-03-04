const express = require('express');
const router = express.Router();
const { protect } = require('../module/auth');
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventAttendees,
  registerForEvent,
  cancelRegistration,
  getEventRecording,
  startEvent,
  endEvent
} = require('../handlers/eventhandler');

// Middleware to check if user is organizer
const isOrganizer = (req, res, next) => {
  if (req.user.role !== 'organizer' && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Organizer access required',
      code: 'ORGANIZER_ONLY'
    });
  }
  next();
};

// Protected routes - require authentication
router.use(protect);

// Public event routes
router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);
router.get('/events/:id/attendees', getEventAttendees);
router.get('/events/:id/recording', getEventRecording);

// Attendee routes
router.post('/events/:id/register', registerForEvent);
router.delete('/events/:id/register', cancelRegistration);

// Organizer only routes
router.post('/events', isOrganizer, createEvent);
router.put('/events/:id', isOrganizer, updateEvent);
router.delete('/events/:id', isOrganizer, deleteEvent);
router.post('/events/:id/start', isOrganizer, startEvent);
router.post('/events/:id/end', isOrganizer, endEvent);

module.exports = router;
