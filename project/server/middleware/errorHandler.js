// Centralized error handler. Never leaks stack traces or internal details in production.
export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` })
}

export function errorHandler(err, req, res, next) {
  console.error(err)
  const status = err.status || 500
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'Internal server error'
    : err.message || 'Internal server error'
  res.status(status).json({ message })
}
