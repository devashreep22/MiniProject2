const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.verifyFarmer = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.role !== 'farmer') return res.status(404).json({ message: 'Farmer not found' });
  user.isVerified = true;
  await user.save();
  res.json({ message: 'Farmer verified' });
};
