const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

// Get cart
router.get('/', protect, cartController.getCart);
// Add/update cart item
router.post('/add', protect, cartController.addToCart);
// Update quantity
router.patch('/update', protect, cartController.updateCartItem);
// Remove product from cart
router.delete('/remove/:productId', protect, cartController.removeFromCart);
// Clear cart
router.delete('/clear', protect, cartController.clearCart);

module.exports = router;
