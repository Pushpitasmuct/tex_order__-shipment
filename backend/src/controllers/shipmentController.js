const Shipment = require('../models/Shipment');

// @desc    Get all active shipments from database mapping
// @route   GET /api/shipments
// @access  Private
const getAllShipments = async (req, res) => {
  try {
    // Finds all shipments and populates the linked order object details
    const shipments = await Shipment.find().populate('order');
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to capture shipment status metrics', 
      error: error.message 
    });
  }
};

// @desc    Create a new shipment manifest pipeline record
// @route   POST /api/shipments
// @access  Private
const createShipment = async (req, res) => {
  try {
    const { trackingNumber, courier, order, estimatedDelivery, status } = req.body;

    const newShipment = new Shipment({
      trackingNumber,
      courier,
      order,
      estimatedDelivery,
      status
    });

    const savedShipment = await newShipment.save();
    res.status(201).json(savedShipment);
  } catch (error) {
    res.status(400).json({ 
      message: 'Failed to initialize shipment token manifest', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllShipments,
  createShipment
};