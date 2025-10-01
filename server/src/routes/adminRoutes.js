const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');


// Get all pending products
router.get('/pending-products', protect, adminOnly, adminController.getPendingProducts);
// Approve/reject product
router.patch('/product/:id/approve', protect, adminOnly, adminController.approveProduct);
// Verify farmer
router.patch('/verify-farmer/:id', protect, adminOnly, adminController.verifyFarmer);

module.exports = router;
