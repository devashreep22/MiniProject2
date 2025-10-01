const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer','farmer','admin'], default: 'buyer' },

  // farmer-specific fields:
  farmName: String,
  farmAddress: String,
  cropTypes: [String],
  isVerified: { type: Boolean, default: false }, // admin verifies farmer

  // shipping/address for buyers:
  addresses: [{
    label: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
    phone: String
  }],

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
