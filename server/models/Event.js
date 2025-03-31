const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventType: {
    type: String,
    enum: ["webinar", "workshop", "conference", "other"],
    required: true,
  },
  startTime: { type: Date },
  endTime: { type: Date },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPublic: { type: Boolean, default: true },
  allowedAttendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  maxAttendees: { type: Number, default: 100 },
  registrationDeadline: { type: Date },
  agenda: [
    {
      title: String,
      startTime: Date,
      endTime: Date,
      description: String,
      speaker: String,
    },
  ],
  speakers: [
    {
      name: String,
      bio: String,
      photo: String,
      topics: [String],
    },
  ],
  exhibitorBooths: [
    {
      name: String,
      description: String,
      logo: String,
      representatives: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      resources: [{ title: String, type: String, url: String }],
    },
  ],
  registeredAttendees: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      registrationTime: { type: Date, default: Date.now },
      attended: { type: Boolean, default: false },
      attendanceTime: Date,
      feedbackProvided: { type: Boolean, default: false },
    },
  ],
  recordingUrl: String,
  meetingDetails: {
    title: { type: String, required: true },
    organizerId: { type: String, required: true }, // Organizer's ID
    roomName: { type: String, required: true },
    dateTime: { type: Date, required: true }, // Scheduled date & time
    attendees: [{ type: String }], // List of registered attendees (user IDs)
  },
  resources: [
    {
      title: String,
      type: String, // e.g., "PDF", "Video", etc.
      url: String,
    },
  ],
  tags: [String],
  status: {
    type: String,
    enum: [
      "draft",
      "scheduled",
      "live",
      "completed",
      "cancelled",
      "upcoming",
      "ongoing",
    ],
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
