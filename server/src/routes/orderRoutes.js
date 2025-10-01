const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, farmerOnly, adminOnly } = require('../middleware/auth');

// Place order (buyer)
router.post('/', protect, orderController.placeOrder);
// Get my orders (buyer)
router.get('/my', protect, orderController.getMyOrders);
// Get orders for farmer's products
router.get('/farmer', protect, farmerOnly, orderController.getFarmerOrders);
// Admin: get all orders
router.get('/all', protect, adminOnly, orderController.getAllOrders);

// Get order details (buyer, farmer, admin)
const orderDetailsController = require('../controllers/orderDetailsController');
router.get('/:id', protect, orderDetailsController.getOrderById);

// Update order status (admin/farmer)
router.patch('/:id/status', protect, orderController.updateOrderStatus);

module.exports = router;
