const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, text: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, index: true }, // e.g., leafy, root, fruit
  imageUrl: String, // path to uploaded image or cloud URL
  stock: { type: Number, default: 1 },
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' }, // admin approval
}, { timestamps: true });

// For text search on name + description
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
