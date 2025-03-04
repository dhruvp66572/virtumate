const express = require('express');
const router = express.Router();
const { protect } = require('../module/auth');
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  changeUserRole,
  getUserEvents,
  updateUserInterests
} = require('../handlers/userhandler');

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

// Protected routes - require authentication
router.use(protect);

// Admin only routes
router.get('/users', isAdmin, getAllUsers);
router.delete('/users/:id', isAdmin, deleteUserById);
router.post('/users/:id/role', isAdmin, changeUserRole);

// User routes
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);
router.get('/users/:id/events', getUserEvents);
router.post('/users/:id/interests', updateUserInterests);

module.exports = router;
