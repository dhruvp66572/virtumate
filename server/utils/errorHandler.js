// backend/utils/errorHandler.js
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
      message: err.message || 'An unexpected error occurred',
        stack: err.stack,
    });

    next();
  };

  module.exports = { errorHandler };
  