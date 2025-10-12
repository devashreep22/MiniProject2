const Product = require('../models/Product');
const User = require('../models/User');

exports.createProduct = async (req, res) => {
  try {
    if (!req.user.isVerified) return res.status(403).json({ message: 'Farmer not verified' });
    const { name, description, price, category, stock } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const product = new Product({
      farmer: req.user.id,
      name,
      description,
      price,
      category,
      imageUrl,
      stock
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, farmer: req.user.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const { name, description, price, category, stock } = req.body;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock) product.stock = stock;
    if (req.file) product.imageUrl = `/uploads/${req.file.filename}`;
    product.status = 'pending'; // Needs re-approval
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, farmer: req.user.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sort } = req.query;
    let filter = { status: 'approved' };
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    let query = Product.find(filter).populate('farmer', 'name farmName');
    if (sort) {
      // e.g. sort=price or sort=-price
      const sortObj = {};
      const s = sort.startsWith('-') ? -1 : 1;
      sortObj[sort.replace('-', '')] = s;
      query = query.sort(sortObj);
    }
    const products = await query;
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name farmName');
    if (!product || product.status !== 'approved') return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.status = req.body.status || 'approved';
    await product.save();
    res.json({ message: `Product ${product.status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFarmerProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user.id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};