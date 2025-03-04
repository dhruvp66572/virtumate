const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['attendee', 'organizer', 'admin'], default: 'attendee' },
  department: String,
  position: String,
  interests: [String],
  profileImage: String,
  bio: String,
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  eventsOrganized: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  eventsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
