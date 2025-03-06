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
router.get('/demo', (res) => {
res.send('Hello World');
});

// Admin only routes
router.get('/', isAdmin, getAllUsers);
router.delete('/:id', isAdmin, deleteUserById);
router.post('/:id/role', isAdmin, changeUserRole);

// User routes
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.get('/:id/events', getUserEvents);
router.post('/:id/interests', updateUserInterests);

module.exports = router;
