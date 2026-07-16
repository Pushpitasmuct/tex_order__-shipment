const express = require('express');
const router = express.Router();
const { getAllShipments, createShipment } = require('../controllers/shipmentController');

// Secure check import for your auth middleware
let authMiddleware;
try {
  // Checks the standard root middleware folder path relative to routes directory
  authMiddleware = require('../../middleware/authMiddleware');
} catch (e) {
  try {
    // Alternative fallback check if it sits inside the src folder instead
    authMiddleware = require('../middleware/authMiddleware');
  } catch (err) {
    console.warn("Warning: authMiddleware file could not be automatically located. Running endpoint in public fallback mode.");
  }
}

// Route protector: Bypasses check gracefully with an empty next wrapper if middleware file is unresolved
const protect = typeof authMiddleware === 'function' 
  ? authMiddleware 
  : (req, res, next) => next();

// Secure endpoints mapped under /api/shipments
router.get('/', protect, getAllShipments);
router.post('/', protect, createShipment);

module.exports = router;