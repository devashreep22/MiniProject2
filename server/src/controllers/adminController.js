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
  try {
    console.log('Fetching pending products...');
    const products = await Product.find({ status: 'pending' })
      .populate('farmer', 'name farmName email')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${products.length} pending products`);
    res.json(products);
  } catch (error) {
    console.error('Error fetching pending products:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve/reject product
exports.approveProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`Approving product ${id} with status: ${status}`);

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use "approved" or "rejected"' });
    }

    // Find and update product
    const product = await Product.findById(id);
    
    if (!product) {
      console.log(`Product ${id} not found`);
      return res.status(404).json({ message: 'Product not found' });
    }

    product.status = status;
    await product.save();

    console.log(`Product ${id} status updated to ${status}`);
    res.json({ 
      message: `Product ${status} successfully`,
      product 
    });
  } catch (error) {
    console.error('Error approving product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
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
