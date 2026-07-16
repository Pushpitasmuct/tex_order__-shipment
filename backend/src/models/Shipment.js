const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  courier: { 
    type: String, 
    required: true 
  },
  order: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  estimatedDelivery: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'In Transit', 'Out for Delivery', 'Delivered'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);