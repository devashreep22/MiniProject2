const Product = require('../models/Product');
const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: true, message: "Users fetched", data: { users } });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.toggleActive = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "No user ID provided" });

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isActive = !user.isActive;
  await user.save();

  res.json({ message: `User ${user.isActive ? "activated" : "deactivated"}`, data: { user } });
};

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
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== "farmer")
      return res.status(404).json({ status: false, message: "Farmer not found" });

    user.isVerified = true;
    await user.save();

    res.json({ status: true, message: "Farmer verified", data: { user } });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
