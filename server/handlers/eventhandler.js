const Event = require("../models/Event");
const User = require("../models/User");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json({
      status: 'success',
      data: events
    });
  } catch (error) {
    res.status(500).json({
      status: 'error', 
      message: error.message
    });
  }
};

// Create new event
const createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user._id
    });
    await event.save();
    res.status(201).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    res.json({
      status: 'success',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    res.json({
      status: 'success',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    res.json({
      status: 'success',
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get event attendees
const getEventAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', '-password');
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    res.json({
      status: 'success',
      data: event.attendees
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Register for event
const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Already registered for this event'
      });
    }

    event.attendees.push(req.user._id);
    await event.save();

    res.json({
      status: 'success',
      message: 'Successfully registered for event'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Cancel registration
const cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    if (!event.attendees.includes(req.user._id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Not registered for this event'
      });
    }

    event.attendees = event.attendees.filter(id => id.toString() !== req.user._id.toString());
    await event.save();

    res.json({
      status: 'success',
      message: 'Successfully cancelled registration'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get event recording
const getEventRecording = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    if (!event.recording) {
      return res.status(404).json({
        status: 'error',
        message: 'No recording available for this event'
      });
    }

    res.json({
      status: 'success',
      data: event.recording
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Start event
const startEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    event.status = 'in-progress';
    event.startedAt = new Date();
    await event.save();

    res.json({
      status: 'success',
      message: 'Event started successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// End event
const endEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    event.status = 'completed';
    event.endedAt = new Date();
    await event.save();

    res.json({
      status: 'success',
      message: 'Event ended successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
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
};
