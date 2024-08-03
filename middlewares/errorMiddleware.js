class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: 'Something went wrong, please try again' });
};

const notFoundHandler = (req, res) => {
  const message = `Route to ${req.method} ${req.originalUrl} not found`;

  res.status(404).json({ message });
};

export { createCustomError, errorHandler, notFoundHandler };
