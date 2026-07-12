const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    fabricType: {
      type: String,
      required: [true, "Fabric type is required"],
      trim: true,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },

    gsm: {
      type: Number,
      required: [true, "GSM is required"],
      min: [10, "Minimum GSM is 10"],
      max: [1000, "Maximum GSM is 1000"],
    },

    colorCode: {
      type: String,
      trim: true,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Standard", "High", "Critical"],
      default: "Standard",
    },

    deliveryDate: {
      type: Date,
      required: [true, "Delivery date is required"],
    },

    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: ["In Queue", "Processing", "Completed", "Cancelled"],
      default: "In Queue",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);