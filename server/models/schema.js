const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  photoURL: { type: String, default: "" },
  organizedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Events created by the user
  attendingEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Events the user is attending
  createdAt: { type: Date, default: Date.now },
});


const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  topics: [String], // Tags/topics for the event
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true }, // Virtual link or physical location
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the user who created the event
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users attending the event
  createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", eventSchema);

module.exports = { User, Event };
