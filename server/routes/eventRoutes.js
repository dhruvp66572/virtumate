const router = require("express").Router();

const {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getEventsByOrganizer,
  attendEvent,
  cancelAttendance,
  getAttendees,
  getEventMeetings,
  createMeeting,
  getMeetingById,
  updateMeetingById,
  deleteMeetingById,
  getMeetingsByHost,
  getMeetingsByParticipant,
  startEvent,
} = require("../handlers/Event");
const { protect } = require("../module/auth");

// Create a new event
router.post("/", protect, createEvent);

// Get all events
router.get("/", protect, getEvents);

// Get an event by id
router.get("/:id", getEventById);

// Update an event by id
router.put("/:id", protect, updateEventById);

// Delete an event by id
router.delete("/:id", protect, deleteEventById);

// organizer start event
router.put("/:id/start", protect, startEvent);

// Get all events by organizer
router.get("/organizer/:id", getEventsByOrganizer);

// Attend an event
router.post("/:id/attend", protect, attendEvent);

// Cancel attendance
router.delete("/:id/attend", protect, cancelAttendance);

// Get attendees
router.get("/:id/attendees", protect, getAttendees);

// Get event meetings
router.get("/:id/meetings", protect, getEventMeetings);

// Create a new meeting
router.post("/:id/meetings", protect, createMeeting);

// Get a meeting by id
router.get("/meetings/:id", protect, getMeetingById);

// Update a meeting by id
router.put("/meetings/:id", protect, updateMeetingById);

// Delete a meeting by id
router.delete("/meetings/:id", protect, deleteMeetingById);

// Get all meetings by host
router.get("/host/:id/meetings", protect, getMeetingsByHost);

// Get all meetings by participant
router.get("/participant/:id/meetings", protect, getMeetingsByParticipant);

module.exports = router;
