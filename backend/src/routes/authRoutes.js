const express = require("express");
const router = express.Router();

// Temporary mock controllers until you create your controller file
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Registration attempt:", { name, email });
    
    // TODO: Add your real database saving logic here later (e.g., User.create)
    
    return res.status(201).json({ message: "Registration complete! Please sign in." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);
    
    // TODO: Add your real database validation and JWT token logic here later
    
    return res.status(200).json({ 
      token: "mock-jwt-token", 
      user: { name: "Test User", email: email } 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;