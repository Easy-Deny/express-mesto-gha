const jwt = require('jsonwebtoken');
const { isAuthorized } = require('../utils/jwt');

const { JWT_SECRET = 'SECRET_KEY' } = process.env;
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!isAuthorized(token)) { next(new UnauthorizedError('not autorization')); }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new UnauthorizedError('not autorization'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
