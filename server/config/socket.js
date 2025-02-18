const setupSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const users = {};
  const socketToRoom = {};

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", (roomId, userId, userName) => {
      if (!users[roomId]) {
        users[roomId] = [];
      }

      console.log(`User joined room: ${roomId}`);

      users[roomId].push({ id: socket.id, userId, userName });
      socketToRoom[socket.id] = roomId;
      socket.join(roomId);

      console.log(users[roomId]);

      const usersInRoom = users[roomId].filter((user) => user.id !== socket.id);
      socket.emit("all-users", usersInRoom);

      console.log(`Users in room: `);
      console.log(usersInRoom);
    
      socket
        .to(roomId)
        .emit("user-connected", { id: socket.id, userId, userName });

      socket.on("sending-signal", ({ userToSignal, signal }) => {
        io.to(userToSignal).emit("user-joined", {
          signal,
          callerID: socket.id,
        });
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

};

module.exports = setupSocket;
