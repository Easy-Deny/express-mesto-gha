class ConflictError extends Error {
  constructor(message) {
    super(message);
    TransitionEvent.statusCode = 409;
  }
}
module.exports = ConflictError;