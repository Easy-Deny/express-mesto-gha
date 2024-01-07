class UnauthorizedError extends Error {
  constructor(message) {
    this.statusCode = 401;
    this.code = 11000;
  }
}