const express = require("express");
const http = require("http");
const cors = require("cors");
const env = require("dotenv");

// Import routes

const user_api = require("./routes/authRoutes");
const event_api = require("./routes/eventRoutes");
const meeting_api = require("./routes/meetingRoutes");
const { connect } = require("./config/connect");

// Setup socket.io

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:5173"],

    methods: ["GET", "POST"],

    credentials: true,
  },
});

const port = 5000;

// Middleware

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true, // Allow cookies if needed
  })
);
app.options("*", cors()); // Handle preflight requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
env.config();

// Routes

app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});
app.use("/api/auth/", user_api);
app.use("/api/events/", event_api);
app.use("/api/meetings/", meeting_api);
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB");
  })

  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-room", (roomId, userId, userName) => {
    if (!users[roomId]) {
      users[roomId] = [];
    }

    users[roomId].push({ id: socket.id, userId, userName });

    socketToRoom[socket.id] = roomId;

    socket.join(roomId);

    const usersInRoom = users[roomId].filter((user) => user.id !== socket.id);

    socket.emit("all-users", usersInRoom);

    socket
      .to(roomId)
      .emit("user-connected", { id: socket.id, userId, userName });

    socket.on("sending-signal", ({ userToSignal, signal }) => {
      io.to(userToSignal).emit("user-joined", { signal, callerID: socket.id });
    });

    socket.on("returning-signal", ({ signal, callerID }) => {
      io.to(callerID).emit("receiving-returned-signal", {
        signal,
        id: socket.id,
      });
    });

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });

    socket.on("mute-unmute", (mute) => {
      io.to(roomId).emit("mute-unmute", socket.id, mute);
    });

    socket.on("video-on-off", (video) => {
      io.to(roomId).emit("video-on-off", socket.id, video);
    });

    socket.on("screen-share", () => {
      io.to(roomId).emit("screen-share", socket.id);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      const roomID = socketToRoom[socket.id];

      if (roomID) {
        users[roomID] = users[roomID].filter((user) => user.id !== socket.id);

        socket.to(roomID).emit("user-disconnected", socket.id);
      }
    });
  });
});

server.listen(5000, () => {
  console.log(`Server running on port ${port}`);

  console.log(`http://localhost:${port}`);
});
