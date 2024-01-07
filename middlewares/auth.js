const { isAuthorized } = require("../utils/jwt");
const UnauthorizedError =require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const token = req.headers.authorization;
 if (!isAuthorized(token)) {next(new UnauthorizedError('not autorization'));}//return res.status(401).send({ message: 'not autorization' });
  next();
};

module.exports = auth;