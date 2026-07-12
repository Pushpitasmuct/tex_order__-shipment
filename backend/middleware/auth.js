// middleware/auth.js
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Decrypt and verify payload signature
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Inject authenticated user ID into request scope
      req.user = { id: decoded.id };
      
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token validation failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Authorization token omitted' });
  }
};

module.exports = { protect };