// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

// Secure all structural endpoints via custom authentication middleware interception
router.route('/')
  .get(protect, getOrders)
  .post(protect, createOrder);

router.route('/:id')
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);

module.exports = router;