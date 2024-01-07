const { isAuthorized } = require("../utils/jwt")

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!isAuthorized(token)) return res.status(401).send({ message: 'not autorization' });
  next();
};

module.exports = auth;