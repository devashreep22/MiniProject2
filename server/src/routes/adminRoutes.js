const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');


// Get all pending products
// Get pending products
router.get('/pending-products', protect, adminOnly, adminController.getPendingProducts);

// Approve/reject product - FIXED: changed from /product/ to /products/
router.patch('/products/:id/approve', protect, adminOnly, adminController.approveProduct);

// Verify farmer
router.patch('/verify-farmer/:id', protect, adminOnly, adminController.verifyFarmer);

router.get('/get-users', protect, adminOnly, adminController.getUsers);
router.patch('/toggle-active/:id', protect, adminOnly, adminController.toggleActive);
module.exports = router;
