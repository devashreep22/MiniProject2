const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');

// Get current user profile
router.get('/me', protect, userController.getProfile);
// Admin: verify farmer
router.patch('/verify/:id', protect, adminOnly, userController.verifyFarmer);

module.exports = router;
