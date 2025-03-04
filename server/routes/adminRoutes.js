const express = require('express');
const router = express.Router();
const { protect } = require('../module/auth');
const { 
  getAllUsers,
  updateUserStatus,
  getAllEvents,
  updateEventStatus,
  getUserAnalytics,
  getEventAnalytics,
  getPlatformAnalytics
} = require('../handlers/adminhandler');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Admin access required',
      code: 'ADMIN_ONLY'
    });
  }
  next();
};

// Protected routes - require authentication and admin role
router.use(protect);
router.use(isAdmin);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id/status', updateUserStatus);

// Event management routes  
router.get('/events', getAllEvents);
router.put('/events/:id/status', updateEventStatus);

// Analytics routes
router.get('/analytics/users', getUserAnalytics);
router.get('/analytics/events', getEventAnalytics);
router.get('/analytics/platform', getPlatformAnalytics);

module.exports = router;

