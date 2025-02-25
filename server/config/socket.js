// const setupSocket = (server) => {
//   const io = require("socket.io")(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ['GET', 'POST'],
//     },
//   });

//   const users = {};
//   const socketToRoom = {};

//   io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     socket.on('join-room', (roomId, userId, userName) => {
//       if (!users[roomId]) {
//         users[roomId] = [];
//       }

//       console.log(`User joined room: ${roomId}`);

//       users[roomId].push({ id: socket.id, userId, userName });
//       socketToRoom[socket.id] = roomId;
//       socket.join(roomId);

//       console.log(users[roomId]);

//       const usersInRoom = users[roomId].filter((user) => user.id !== socket.id);
//       socket.emit("all-users", usersInRoom);

//       console.log(`Users in room: `);
//       console.log(usersInRoom);
    
//       socket
//         .to(roomId)
//         .emit('user-connected', { id: socket.id, userId, userName });

//       socket.on('sending-signal', ({ userToSignal, signal }) => {
//         io.to(userToSignal).emit('user-joined', {
//           signal,
//           callerID: socket.id,
//         });
//       });

//       socket.on('returning-signal', ({ signal, callerID }) => {
//         io.to(callerID).emit('receiving-returned-signal', {
//           signal,
//           id: socket.id,
//         });
//       });

//       socket.on('message', (message) => {
//         io.to(roomId).emit('createMessage', message);
//       });

//       socket.on('mute-unmute', (mute) => {
//         io.to(roomId).emit('mute-unmute', socket.id, mute);
//       });

//       socket.on('video-on-off', (video) => {
//         io.to(roomId).emit('video-on-off', socket.id, video);
//       });

//       socket.on('screen-share', () => {
//         io.to(roomId).emit('screen-share', socket.id);
//       });

//       socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.id}`);
//         const roomID = socketToRoom[socket.id];
//         if (roomID) {
//           users[roomID] = users[roomID].filter((user) => user.id !== socket.id);
//           socket.to(roomID).emit('user-disconnected', socket.id);
//         }
//       });
//     });
//   });

// };

// module.exports = setupSocket;

const setupSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ['GET', 'POST'],
    },
  });

  const users = {}; // { roomId: [{ id, userId, userName }] }
  const socketToRoom = {}; // { socketId: roomId }

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining a room
    socket.on('join-room', (roomId, userId, userName) => {
      console.log(`User ${socket.id} joining room: ${roomId}`);
    
      if (!users[roomId]) {
        users[roomId] = [];
      }
    
      users[roomId].push({ id: socket.id, userId, userName });
      socketToRoom[socket.id] = roomId;
      socket.join(roomId);
    
      console.log(`Users in room ${roomId}:`, users[roomId]);
    
      // Notify newly joined user of existing users
      const existingUsers = users[roomId].filter(user => user.id !== socket.id);
      socket.emit("all-users", existingUsers);
    
      // Notify all other users about the new user with signaling data
      existingUsers.forEach(user => {
        socket.to(user.id).emit('user-joined', { callerID: socket.id });
      });
    });
    

    // WebRTC signaling
    socket.on('sending-signal', ({ userToSignal, callerID, signal }) => {
      console.log(`Sending signal from ${callerID} to ${userToSignal}`);
      io.to(userToSignal).emit('user-joined', { signal, callerID });
    });

    socket.on('returning-signal', ({ signal, callerID }) => {
      console.log(`Returning signal from ${socket.id} to ${callerID}`);
      io.to(callerID).emit('receiving-returned-signal', { signal, id: socket.id });
    });

    // Handle messages
    socket.on('message', (message) => {
      const roomId = socketToRoom[socket.id];
      console.log(`Message received in room ${roomId}:`, message);
      if (roomId) {
        io.to(roomId).emit('createMessage', message);
      }
    });

    // Mute/Unmute Audio
    socket.on('mute-unmute', (mute) => {
      const roomId = socketToRoom[socket.id];
      console.log(`User ${socket.id} mute status: ${mute}`);
      if (roomId) {
        io.to(roomId).emit('mute-unmute', socket.id, mute);
      }
    });

    // Video On/Off
    socket.on('video-on-off', (video) => {
      const roomId = socketToRoom[socket.id];
      console.log(`User ${socket.id} video status: ${video}`);
      if (roomId) {
        io.to(roomId).emit('video-on-off', socket.id, video);
      }
    });

    // Screen Share
    socket.on('screen-share', () => {
      const roomId = socketToRoom[socket.id];
      console.log(`User ${socket.id} started screen sharing`);
      if (roomId) {
        io.to(roomId).emit('screen-share', socket.id);
      }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      const roomId = socketToRoom[socket.id];

      if (roomId) {
        console.log(`Removing user ${socket.id} from room ${roomId}`);
        users[roomId] = users[roomId]?.filter(user => user.id !== socket.id) || [];

        // Notify other users about the disconnected user
        socket.to(roomId).emit('user-disconnected', socket.id);

        // Remove empty rooms
        if (users[roomId].length === 0) {
          delete users[roomId];
        }
      }

      delete socketToRoom[socket.id];
    });
  });
};

module.exports = setupSocket;
