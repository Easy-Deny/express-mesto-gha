class NotFoundError extends Error {
  constructor(message) {
    super(message);
    TransitionEvent.statusCode = 404;
  }
}
module.exports = NotFoundError;