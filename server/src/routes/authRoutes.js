// Create admin (open for initial setup, restrict/remove after use)

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register (buyer/farmer)
router.post('/register', authController.register);
// Login
router.post('/login', authController.login);


// Get logged-in user profile
const { protect } = require('../middleware/auth');
const userController = require('../controllers/userController');
router.get('/me', protect, userController.getProfile);
router.post('/create-admin', authController.createAdmin);

module.exports = router;
