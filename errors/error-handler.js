//const { userSchema } = require("../models/user");

const errorHandler = (err) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'server error' : err.message;
  res.status(statusCode).send({ message });
  nest();
}
module.exports = errorHandler;