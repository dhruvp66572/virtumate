const Event = require("../models/Event");
const { User } = require("../models/User");
const Meeting = require("../models/Meeting");

const createEvent = async (req, res) => {
  const { title, description, date, time, duration, meetingLink } = req.body;
  // const organizer = req.user.id;
  const organizer = "677d11705aa020a62dcf1795";
  const event = new Event({
    title,
    description,
    date,
    time,
    duration,
    organizer,
    meetingLink,
  });
  try {
    await event.save();
    const user = await User.findById(organizer);
    user.organizedEvents.push(event._id);
    await user.save();
    res.json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Event creation failed" });
  }
};

// get all events
const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

// get event by id
const getEventById = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event);
};

// update event by id
const updateEventById = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, time, duration, meetingLink } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, date, time, duration, meetingLink },
      { new: true }
    );
    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Event update failed" });
  }
};

// delete event by id
const deleteEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const user = await User.findById(event.organizer);
    user.organizedEvents = user.organizedEvents.filter(
      (eventId) => eventId.toString() !== id
    );

    await user.save();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Event deletion failed" });
  }
};

// get all events by organizer
const getEventsByOrganizer = async (req, res) => {
  const { id } = req.params;
  const events = await Event.find({ organizer: id });
  res.json(events);
};

// organizer start event
const startEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.status = "ongoing";
    await event.save();
    res.json({ message: "Event started", event });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Failed to start event" });
  }
};

// attend event by id (add user to attendees list)
const attendEvent = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User already attending the event" });
    }
    event.attendees.push(userId);
    await event.save();
    const user = await User.findById(userId);
    user.attendingEvents.push(event._id);
    await user.save();
    res.json({ message: "Attending event", event });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Failed to attend event" });
  }
};

// cancel attendance by id (remove user from attendees list)
const cancelAttendance = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.attendees = event.attendees.filter(
      (attendee) => attendee.toString() !== userId
    );
    await event.save();
    const user = await User.findById(userId);
    user.attendingEvents = user.attendingEvents.filter(
      (eventId) => eventId.toString() !== id
    );
    await user.save();
    res.json({ message: "Attendance cancelled", event });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Failed to cancel attendance" });
  }
};

// get attendees of an event
const getAttendees = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id).populate("attendees");
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event.attendees);
};

// get meetings of an event
const getEventMeetings = async (req, res) => {
  const { id } = req.params;
  const meetings = await Meeting.find({ eventId: id });
  res.json(meetings);
};

// create a meeting for an event
const createMeeting = async (req, res) => {
  const { id } = req.params;
  const { title, host, participants, meetingURL, startTime, endTime } =
    req.body;
  const meeting = new Meeting({
    eventId: id,
    title,
    host,
    participants,
    meetingURL,
    startTime,
    endTime,
  });
  try {
    await meeting.save();
    res.json({ message: "Meeting created successfully", meeting });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Meeting creation failed" });
  }
};

// get meeting by id
const getMeetingById = async (req, res) => {
  const { id } = req.params;
  const meeting = await Meeting.findById(id);
  if (!meeting) {
    return res.status(404).json({ error: "Meeting not found" });
  }
  res.json(meeting);
};

// update meeting by id
const updateMeetingById = async (req, res) => {
  const { id } = req.params;
  const { title, host, participants, meetingURL, startTime, endTime } =
    req.body;
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      id,
      { title, host, participants, meetingURL, startTime, endTime },
      { new: true }
    );
    res.json({ message: "Meeting updated successfully", meeting });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Meeting update failed" });
  }
};

// delete meeting by id
const deleteMeetingById = async (req, res) => {
  const { id } = req.params;
  try {
    const meeting = await Meeting.findByIdAndDelete(id);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Meeting deletion failed" });
  }
};

// get all meetings by host
const getMeetingsByHost = async (req, res) => {
  const { id } = req.params;
  const meetings = await Meeting.find({ host: id });
  res.json(meetings);
};

// get all meetings by participant
const getMeetingsByParticipant = async (req, res) => {
  const { id } = req.params;
  const meetings = await Meeting.find({ participants: id });
  res.json(meetings);
};

module.exports = {
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
};
