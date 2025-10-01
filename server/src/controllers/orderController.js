const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.status !== 'approved') return res.status(400).json({ message: 'Invalid product' });
      if (product.stock < item.quantity) return res.status(400).json({ message: 'Insufficient stock' });
      product.stock -= item.quantity;
      await product.save();
      orderItems.push({
        product: product._id,
        farmer: product.farmer,
        quantity: item.quantity,
        price: product.price
      });
      totalAmount += product.price * item.quantity;
    }
    const order = new Order({
      buyer: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod: 'COD',
      totalAmount
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ buyer: req.user.id }).populate('items.product').sort('-createdAt');
  res.json(orders);
};

exports.getFarmerOrders = async (req, res) => {
  const orders = await Order.find({ 'items.farmer': req.user.id }).populate('buyer', 'name email').sort('-createdAt');
  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('buyer', 'name email').sort('-createdAt');
  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = req.body.status;
  await order.save();
  res.json(order);
};
