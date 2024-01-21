class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.code = 11000;
  }
}
module.exports = UnauthorizedError;
