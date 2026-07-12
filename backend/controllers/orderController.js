// controllers/orderController.js
const Order = require('../models/Order');

// @desc    Get all orders for logged-in user
// @route   GET /api/orders
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    next(error); // Passes unexpected execution errors downstream to unified handler
  }
};

// @desc    Create a manufacturing run
// @route   POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const { fabricType, quantity, gsm, colorCode, priority, deliveryDate, notes } = req.body;

    const newOrder = await Order.create({
      user: req.user.id, // Binds ownership
      fabricType,
      quantity,
      gsm,
      colorCode,
      priority,
      deliveryDate,
      notes
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a specific record
// @route   PUT /api/orders/:id
const updateOrder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order reference untraceable' });
    if (order.user.toString() !== req.user.id) return res.status(403).json({ message: 'Action unauthorized' });

    order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete custom order resource
// @route   DELETE /api/orders/:id
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order reference untraceable' });
    if (order.user.toString() !== req.user.id) return res.status(403).json({ message: 'Action unauthorized' });

    await order.deleteOne();
    res.status(200).json({ id: req.params.id, deleted: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrders, createOrder, updateOrder, deleteOrder };