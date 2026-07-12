// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Ties data records strictly to an authenticated user
  },
  fabricType: {
    type: String,
    required: [true, 'Fabric specification variant is mandatory'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Volume in yards is required'],
    min: [1, 'Minimum order quantity is 1 yard']
  },
  gsm: {
    type: Number,
    required: [true, 'Fabric weight is required'],
    min: 10,
    max: 1000
  },
  colorCode: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['Low', 'Standard', 'High', 'Critical'],
    default: 'Standard'
  },
  deliveryDate: {
    type: String, // Stored as ISO string format ('YYYY-MM-DD')
    required: [true, 'Target timeline allocation is required']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['In Queue', 'In Production', 'Completed', 'Cancelled'],
    default: 'In Queue'
  }
}, {
  timestamps: true // Automatically tracks createdAt/updatedAt stamps
});

module.exports = mongoose.model('Order', OrderSchema);