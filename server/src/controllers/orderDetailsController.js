const Order = require('../models/Order');

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('buyer', 'name email')
    .populate('items.product')
    .populate('items.farmer', 'name farmName');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  // Only allow buyer, farmer (involved), or admin to view
  if (
    req.user.role === 'buyer' && order.buyer._id.toString() !== req.user.id ||
    req.user.role === 'farmer' && !order.items.some(i => i.farmer._id.toString() === req.user.id)
  ) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json(order);
};
