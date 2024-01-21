const { isAuthorized } = require("../utils/jwt");
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET = "SECRET_KEY" } = process.env;

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!isAuthorized(token)) { next(new UnauthorizedError('not autorization')); }//return res.status(401).send({ message: 'not autorization' });
  let payload
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new UnauthorizedError('not autorization'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;