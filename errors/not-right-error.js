class NotRightError extends Error {
  constructor(message) {
    super(message);
    TransitionEvent.statusCode = 401;
  }
}
module.exports = NotRightError;