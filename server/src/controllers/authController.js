
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, farmName, farmAddress, cropTypes } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hash, role });
    if (role === 'farmer') {
      user.farmName = farmName;
      user.farmAddress = farmAddress;
      user.cropTypes = cropTypes;
      user.isVerified = false;
    }
    await user.save();
    res.status(201).json({ message: 'Registration successful, please login.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified } });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err)
  }
};

// Create admin user (for initial setup only)
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hash, role: 'admin', isVerified: true });
    await user.save();
    res.status(201).json({ message: 'Admin created', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};