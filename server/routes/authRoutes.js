const express = require('express');
const router = express.Router();
const { protect } = require('../module/auth');
const { 
  createUser,
  loginUser,
  logoutUser, 
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getprofile,
  updateprofile
} = require('../handlers/authhandlers');

// Auth routes
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected user routes
router.use(protect);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);
router.get('/me', getprofile);
router.put('/me', updateprofile);

module.exports = router;
