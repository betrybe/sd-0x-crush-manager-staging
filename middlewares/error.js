module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(err.status || 400).json({ message: err.details[0].message });
  }

  if (err.isBoom) {
    return res.status(err.output.statusCode).json({ message: err.output.payload.message });
  }

  return res.status(500).json({ message: err.message });
};
