class BadRequestError extends Error {
  constructor(message) {
    super(message);
    TransitionEvent.statusCode = 400;
  }
}
module.exports = BadRequestError;