class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';
  console.error(`[ERROR] ${status}: ${message}`);
  res.status(status).json({ error: message, status });
}

function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
}

module.exports = { AppError, errorHandler, notFoundHandler };
