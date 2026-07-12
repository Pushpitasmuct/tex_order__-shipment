const express = require("express");
const cors = require("cors");

const orderRoutes = require("./src/routes/order.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use(cors());

app.use(express.json());

app.use("/api/orders",orderRoutes);

module.exports = app;