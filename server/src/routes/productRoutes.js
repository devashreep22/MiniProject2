const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, farmerOnly, adminOnly } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for single image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create product (farmer)
router.post('/', protect, farmerOnly, upload.single('image'), productController.createProduct);
// Update product (farmer)
router.put('/:id', protect, farmerOnly, upload.single('image'), productController.updateProduct);
// Delete product (farmer)
router.delete('/:id', protect, farmerOnly, productController.deleteProduct);
// Get all approved products (buyer)
router.get('/', productController.getProducts);
// Get single product
router.get('/:id', productController.getProductById);
// Admin: approve/reject product
router.patch('/approve/:id', protect, adminOnly, productController.approveProduct);
router.get('/farmer/my-products', protect, productController.getFarmerProducts);

module.exports = router;
