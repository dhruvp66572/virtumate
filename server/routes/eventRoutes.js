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
  endEvent,
  sendEventEmail
} = require('../handlers/eventhandler');

// Middleware to check if user is organizer
// const isOrganizer = (req, res, next) => {
//   if (req.user.role !== 'organizer' && req.user.role !== 'admin') {
//     return res.status(403).json({
//       status: 'error',
//       message: 'Organizer access required',
//       code: 'ORGANIZER_ONLY'
//     });
//   }
//   next();
// };

// Protected routes - require authentication
router.use(protect);

// Public event routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.get('/:id/attendees', getEventAttendees);
router.get('/:id/recording', getEventRecording);

// Attendee routes
router.put('/:id/register', registerForEvent);
router.delete('/:id/register', cancelRegistration);

// Organizer only routes
router.post('/:id/send-email', sendEventEmail); // Assuming this is a public route
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/start', startEvent);
router.post('/:id/end', endEvent);

module.exports = router;
