class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    TransitionEvent.statusCode = 403;
  }
}
module.exports = ForbiddenError;