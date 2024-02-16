class CustomError extends Error {
  constructor(message, isOperational = true) {
    super(message);
    this.name          = this.constructor.name;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = CustomError;
