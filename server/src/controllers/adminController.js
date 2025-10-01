const Product = require('../models/Product');
const User = require('../models/User');

exports.getPendingProducts = async (req, res) => {
  const products = await Product.find({ status: 'pending' }).populate('farmer', 'name farmName');
  res.json(products);
};

exports.approveProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.status = req.body.status || 'approved';
  await product.save();
  res.json({ message: `Product ${product.status}` });
};

exports.verifyFarmer = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.role !== 'farmer') return res.status(404).json({ message: 'Farmer not found' });
  user.isVerified = true;
  await user.save();
  res.json({ message: 'Farmer verified' });
};
