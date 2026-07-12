// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB Atlas or Local instance
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json()); // Essential for handling your React JSON payloads

// Mount API Routes
app.use('/api/orders', orderRoutes);

// Centralized Error Handler (Must be registered last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Production server running on port ${PORT}`));