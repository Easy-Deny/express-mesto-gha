const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET = "SECRET_KEY" } = process.env;
const { getJwtToken, isAuthorized } = require('../utils/jwt')
const BadRequestError = require('../errors/badrequest-error');
const NotFoundError = require('../errors/not-found-error');
const NotRightError = require('../errors/not-right-error');

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      return UserModel.create({ name, about, avatar, email, password: hash })
    })
    .then((data) => {
      return res.status(201).send(data._id);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Incorrect user info error: ${err.name}: ${err.message}`));
        //return res.status(400).send({ message: `Incorrect user info error: ${err.name}: ${err.message}` });
      }
      if (err.code === 11000) {
        return res.status(409).send({ message: `user with an email address exists: ${err.name}: ${err.message}` });
      }
      next(err);
      //return res.status(500).send('Server Error');
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotRightError(`user not found`);
        //return res.status(401).send({ message: `user not found` });
      }
      bcrypt.compare(password, user.password, function (err, isValidPassword) {
        if (!isValidPassword) {
          throw new NotRightError(`password is not correct`);
          //return res.status(401).send({ message: `password is not correct` });
        }
        const token = getJwtToken({ _id: user._id, email: user.email });
        return res.status(200).send({ token });
      })
    })
    .catch((err) => {
      return res.status(500).send('Server Error');
    });
};

const getUsers = (req, res, next) => {
  //const token = req.headers.authorization;
  //if (!isAuthorized(token)) return res.status(401).send({ message: 'not autorization' });
  return UserModel.find()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch(() => {
      return res.status(500).send('Server Error');
    });
};

const getUserById = (req, res, next) => {
  UserModel.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
        //return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        next(new BadRequestError(`Invalid Id Error: ${err.name}: ${err.message}`));
        //return res.status(400).send({ message: `Invalid Id Error: ${err.name}: ${err.message}` });
      }
      next(err);
      //return res.status(500).send('Server Error');
    });
};

const updateUserById = (req, res, next) => {
  return UserModel.findByIdAndUpdate(req.user, req.body, { new: true, runValidators: true })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Incorrect user info: ${err.name}: ${err.message}`));
        //return res.status(400).send({ message: `Incorrect user info: ${err.name}: ${err.message}` });
      }
      next(err);
      //return res.status(500).send('Server Error');
    });
}

const updateUserAvatarById = (req, res, next) => {
  return UserModel.findByIdAndUpdate(req.user, { avatar: req.body.avatar }, { new: true, runValidators: true })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Incorrect user info error: ${err.name}: ${err.message}`));
        //return res.status(400).send({ message: `Incorrect user info error: ${err.name}: ${err.message}` });
      }
      next(err);
      //return res.status(500).send('Server Error');
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
  login,
};
