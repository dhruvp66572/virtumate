const express = require('express');
const http = require("http");
const cors = require('cors');
const user_api = require('./routes/authRoutes');
const event_api = require('./routes/eventRoutes');
const meeting_api = require('./routes/meetingRoutes');
const setupSocket = require('./config/socket');

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(cors(
  {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});

// Pass io to routes
app.use((req, res, next) => {
  req.io = io; // Attach io instance to request object
  next();
});

app.use("/api/auth/", user_api);
app.use("/api/events/", event_api);
app.use("/api/meetings/", meeting_api);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
});

module.exports = server;