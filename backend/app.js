const express = require("express");
const cors = require("cors");

const orderRoutes = require("./src/routes/order.routes");
const authRoutes = require("./src/routes/authRoutes"); 
// 1. Import the new shipment routes
const shipmentRoutes = require("./src/routes/shipmentRoutes"); 

const app = express();

// Middleware (Cleaned up duplicates)
app.use(cors());
app.use(express.json());

// Main App API Routes
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes); 
// 2. Mount the shipment routes so the frontend can reach them
app.use("/api/shipments", shipmentRoutes); 

module.exports = app;