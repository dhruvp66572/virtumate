const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { Server } = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const Event = require('./models/Event');
const { User } = require('./models/User');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO instance
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, // 🔹 Replace with your client URL
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Virtumate API');
});
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/',adminRoutes);
app.use('/api/events/', eventRoutes);
app.get('/api/stats', async (req, res) => {
  try {
    // Count total events
    const totalEvents = await Event.countDocuments();
    
    // Count active users
    const activeUsers = await User.countDocuments({ status: 'active' });
    
    // Count completed events
    const completedEvents = await Event.countDocuments({ 
      status: 'completed'
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        totalEvents,
        activeUsers,
        completedEvents
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch statistics'
    });
  }

});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinEvent', (eventId) => {
    socket.join(eventId);
  });

  socket.on('leaveEvent', (eventId) => {
    socket.leave(eventId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
