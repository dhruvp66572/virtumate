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

const User = mongoose.model("User", userSchema);

module.exports = { User };
