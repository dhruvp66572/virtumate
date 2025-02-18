const {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    getprofile,
    updateprofile,
} = require("../handlers/User");

const { Router } = require("express");
const { body } = require("express-validator");
const { inputErrorHandler } = require("../module/middleware");
const { protect } = require("../module/auth");

const router = Router();

// Create a new user
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("name").isLength({ min: 3 }),
  ],
  inputErrorHandler,
  createUser
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
  ],
  loginUser
);

// Get all users
router.get("/users", getAllUsers);

// Get a user by id
router.get("/users/:id", getUserById);

// Update a user by id
router.put("/users/:id", updateUserById);

// Delete a user by id
router.delete("/users/:id", deleteUserById);

// Get profile
router.get("/profile", protect, getprofile);

// Update profile
router.put("/profile", protect, updateprofile);

module.exports = router;