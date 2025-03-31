const Event = require("../models/Event");
const {generateToken} = require("../utils/livekitUtils")
const { User } = require("../models/User");
const sendMail = require("../utils/sendMail");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json({
      status: "success",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Create new event
const createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizerId: req.user.id,
    });
    await event.save();

    const user = await User.findById(req.user.id);
    user.eventsOrganized.push(event._id);
    await user.save();

    res.status(201).json({
      status: "success",
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizerId", "-password")
      .populate("registeredAttendees.userId", "-password");

    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }
    res.json({
      status: "success",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
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
        status: "error",
        message: "Event not found",
      });
    }
    res.json({
      status: "success",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    const user = await User.findById(req.user.id);
    user.eventsOrganized = user.eventsOrganized.filter(
      (id) => id.toString() !== req.params.id
    );
    await user.save();

    res.json({
      status: "success",
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get event attendees
const getEventAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("registeredAttendees.userId", "-password name email")
      .lean();

    if (!event) {
      return res
        .status(404)
        .json({ status: "error", message: "Event not found" });
    }

    console.log(event.registeredAttendees); // Debugging: Check if userId is populated

    res.json({ status: "success", data: event.registeredAttendees });
  } catch (error) {
    console.error("Error fetching event attendees:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Send event email
const sendEventEmail = async (req, res) => {
  try {
    const { subject, body, attendees } = req.body;

    // Logic to send email to all registered attendees
    await sendMail("dhruvprajapati66572@gmail.com", subject, body);

    res.json({
      status: "success",
      message: "Email sent to all registered attendees",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Register for event
const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.json({
        status: "error",
        message: "Event not found",
      });
    }
    if (
      event.registeredAttendees.some((attendee) => attendee._id == req.user.id)
    ) {
      return res.json({
        status: "error",
        message: "Already registered for this event",
      });
    }

    if (event.registeredAttendees.length >= event.maxAttendees) {
      return res.json({
        status: "error",
        message: "Event is fully booked",
      });
    }

    event.registeredAttendees.push(req.user.id);
    await event.save();

    let user = await User.findById(req.user.id);
    if (!user) {
      return res.json({
        status: "error",
        message: "User not found",
      });
    }
    user.eventsAttended.push(event._id);
    await user.save();

    // Send email to the user
    await sendMail(
      user.email,
      "Event Registration Confirmation",
      `You have successfully registered for the event: ${event.title}`
    );

    res.json({
      status: "success",
      message: "Successfully registered for event",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Cancel registration
const cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    if (!event.attendees.includes(req.user.id)) {
      return res.status(400).json({
        status: "error",
        message: "Not registered for this event",
      });
    }

    event.registeredAttendees = event.registeredAttendees.filter(
      (attendee) => attendee._id != req.user.id
    );
    await event.save();

    res.json({
      status: "success",
      message: "Successfully cancelled registration",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get event recording
const getEventRecording = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    if (!event.recording) {
      return res.status(404).json({
        status: "error",
        message: "No recording available for this event",
      });
    }

    res.json({
      status: "success",
      data: event.recording,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Start event
const startEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    event.status = "in-progress";
    event.startedAt = new Date();
    await event.save();

    res.json({
      status: "success",
      message: "Event started successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// End event
const endEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    event.status = "completed";
    event.endedAt = new Date();
    await event.save();

    res.json({
      status: "success",
      message: "Event ended successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// 📌 Create & Schedule a Meeting 
const createeventmeeting = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    // Logic to create and schedule a meeting
   
    const meeting = {
      title: event.title,
      organizerId: req.user.id,
      roomName: event._id,
      dateTime: event.startTime,
      attendees: event.registeredAttendees.map((attendee) => attendee._id),
    };

    // Save meeting details to the event
    event.meetingDetails = meeting;
    await event.save();  

    res.json({
      status: "success",
      message: "Meeting created successfully",
      data: meeting,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// 📌 Join a Meeting (Attendee)
const joinEventMeeting = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    // Logic to join the meeting
    const meetingDetails = event.meetingDetails;
    if (!meetingDetails) {
      return res.status(404).json({
        status: "error",
        message: "Meeting details not found",
      });
    }

    if (!meetingDetails.attendees.includes(req.user.id)) {
      return res.status(403).json({
        status: "error",
        message: "You are not allowed to join this meeting",
      });
    }

    // Logic to join the meeting (e.g., using a video conferencing API)
    const token = await generateToken(event._id, req.user.id, false);

    res.json({
      status: "success",
      message: "Joined the meeting successfully",
      data: meetingDetails,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Export all handlers
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
  endEvent,
  sendEventEmail,
  createeventmeeting,
  joinEventMeeting
};
