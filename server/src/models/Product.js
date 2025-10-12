const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 100
  },
  description: { 
    type: String, 
    trim: true,
    maxlength: 1000
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Meat', 'Herbs', 'Flowers', 'Other'],
    index: true 
  },
  imageUrl: { 
    type: String,
    default: null
  },
  stock: { 
    type: Number, 
    default: 1,
    min: 0
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  // Added fields for better functionality
  slug: {
    type: String,
    unique: true,
    sparse: true // Allows multiple nulls but ensures unique when present
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  unit: {
    type: String,
    enum: ['kg', 'g', 'lb', 'piece', 'bunch', 'dozen', 'pack'],
    default: 'kg'
  },
  unitPrice: {
    type: Number,
    min: 0
  },
  // Analytics fields
  views: {
    type: Number,
    default: 0
  },
  salesCount: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, { 
  timestamps: true 
});

// For text search on name + description
productSchema.index({ name: 'text', description: 'text' });

// Compound indexes for better query performance
productSchema.index({ farmer: 1, status: 1 });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ status: 1, createdAt: -1 });
productSchema.index({ isActive: 1, status: 1 });

// Pre-save middleware to generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.generateSlug();
  }
  next();
});

// Method to generate URL-friendly slug
productSchema.methods.generateSlug = function() {
  const baseSlug = this.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  // Add timestamp to ensure uniqueness
  return `${baseSlug}-${Date.now()}`;
};

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price.toFixed(2)}`;
});

// Virtual for display name with unit
productSchema.virtual('displayName').get(function() {
  return `${this.name} (per ${this.unit})`;
});

// Static method to find active products
productSchema.statics.findActive = function() {
  return this.find({ isActive: true, status: 'approved' });
};

// Static method to find by category
productSchema.statics.findByCategory = function(category) {
  return this.find({ 
    category, 
    isActive: true, 
    status: 'approved' 
  });
};

// Instance method to update stock
productSchema.methods.updateStock = function(quantity) {
  this.stock += quantity;
  if (this.stock < 0) this.stock = 0;
  return this.save();
};

// Instance method to approve product
productSchema.methods.approve = function() {
  this.status = 'approved';
  return this.save();
};

// Instance method to reject product
productSchema.methods.reject = function(reason) {
  this.status = 'rejected';
  this.rejectionReason = reason; // You might want to add this field
  return this.save();
};

// Update rating method
productSchema.methods.updateRating = function(newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);