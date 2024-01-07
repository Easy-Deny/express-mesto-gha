const jwt = require('jsonwebtoken');
const { JWT_SECRET = "SECRET_KEY" } = process.env;
const UserModel = require('../models/user');

const getJwtToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
}

const isAuthorized = (token) => {
  return jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) return false;
    return UserModel.findById(decoded._id)
      .then((user) => {
        if (!user) return false;
        return true;
      })
      .catch((err) => { return false })
  });
}
module.exports = {
  getJwtToken,
  isAuthorized,
}