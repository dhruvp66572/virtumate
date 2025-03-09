const User = require('../models/User');
const Event = require('../models/Event');

// Get all users with filters
const getAllUsers = async (req, res) => {
  try {
    // Extract filter parameters from request query
    const { status, role, search } = req.query;
    
    // Initialize empty query object for MongoDB
    let query = {};

    // Add status filter if provided
    if (status) query.status = status;
    
    // Add role filter if provided 
    if (role) query.role = role;
    
    // Add search filter if provided
    // Uses MongoDB $regex for case-insensitive partial matching
    // Searches both name and email fields
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },  // 'i' flag makes it case insensitive
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query).select('-password');
    res.json({
      status: 'success',
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update user status
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get all events with filters
const getAllEvents = async (req, res) => {
  try {
    const { status, type, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query).populate('organizerId', 'name email');
    res.json({
      status: 'success',
      data: events
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update event status
const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    res.json({
      status: 'success',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get user analytics
const getUserAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    const usersByStatus = await User.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      status: 'success',
      data: {
        totalUsers,
        usersByRole,
        usersByStatus
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get event analytics
const getEventAnalytics = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const eventsByStatus = await Event.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const eventsByType = await Event.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    res.json({
      status: 'success',
      data: {
        totalEvents,
        eventsByStatus,
        eventsByType
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get platform analytics
const getPlatformAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const activeEvents = await Event.countDocuments({ status: 'active' });
    const completedEvents = await Event.countDocuments({ status: 'completed' });
    
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: { 
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      status: 'success',
      data: {
        totalUsers,
        totalEvents,
        activeEvents,
        completedEvents,
        userGrowth
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserStatus,
  getAllEvents,
  updateEventStatus,
  getUserAnalytics,
  getEventAnalytics,
  getPlatformAnalytics
};
