const Meeting = require("../models/Meeting");
const User = require("../models/User");
const Event = require("../models/Event");

// create a meeting for an event by the host
const createMeeting = async (req, res) => {
  const {
    eventId,
    title,
    host,
    participants,
    roomId,
    startTime,
    endTime,
    status,
  } = req.body;
  const meeting = new Meeting({
    eventId,
    title,
    host,
    participants,
    roomId,
    startTime,
    endTime,
    status,
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

// get all meetings
const getAllMeetings = async (req, res) => {
  const meetings = await Meeting.find();
  res.json(meetings);
};

// get a meeting by id
const getMeetingById = async (req, res) => {
  const { id } = req.params;
  const meeting = await Meeting.findById(id);
  if (!meeting) {
    return res.status(404).json({ error: "Meeting not found" });
  }
  res.json(meeting);
};

// update a meeting by id
const updateMeetingById = async (req, res) => {
  const { id } = req.params;
  const {
    eventId,
    title,
    host,
    participants,
    meetingURL,
    startTime,
    endTime,
    status,
  } = req.body;
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      id,
      {
        eventId,
        title,
        host,
        participants,
        meetingURL,
        startTime,
        endTime,
        status,
      },
      { new: true }
    );
    res.json({ message: "Meeting updated successfully", meeting });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Meeting update failed" });
  }
};

// delete a meeting by id
const deleteMeetingById = async (req, res) => {
  const { id } = req.params;
  try {
    await Meeting.findByIdAndDelete(id);
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

// end a meeting and save summary
const endMeeting = async (req, res) => {
  const { id } = req.params;
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      id,
      { status: "ended" },
      { new: true }
    );
    res.json({ message: "Meeting ended successfully", meeting });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Meeting end failed" });
  }
};



// export meeting handlers
module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeetingById,
  deleteMeetingById,
  getMeetingsByHost,
  getMeetingsByParticipant,
  endMeeting,
};
