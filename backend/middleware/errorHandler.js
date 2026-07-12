// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Catch typical Mongoose Validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ message: 'Validation Exception', details: messages });
  }

  // Fallback Catch-All Engine Error Status
  res.status(err.status || 500).json({
    message: err.message || 'Internal Production Runtime Server Failure'
  });
};

module.exports = errorHandler;