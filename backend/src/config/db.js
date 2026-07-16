const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // সরাসরি মঙ্গোডিবির কানেকশন স্ট্রিং (কোনো process.env ঝামেলা ছাড়া)
    await mongoose.connect("mongodb+srv://pushpitasmuct:pushpita123@cluster0.qpedl3t.mongodb.net/ordersDB?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;