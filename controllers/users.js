const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const { getJwtToken } = require('../utils/jwt')
const BadRequestError = require('../errors/badrequest-error');
const NotFoundError = require('../errors/not-found-error');
const NotRightError = require('../errors/not-right-error');
const ConflictError = require('../errors/conflict-error');

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((data) => res.status(201).send(data._id))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Incorrect user info error: ${err.name}: ${err.message}`));
      }
      if (err.code === 11000) {
        next(new ConflictError(`user with an email address exists: ${err.name}: ${err.message}`));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotRightError('user not found');
      }
      bcrypt.compare(password, user.password, function(err, isValidPassword) {
        if (!isValidPassword) {
          throw (new NotRightError('password is not correct'));
        }
        const token = getJwtToken({ _id: user._id, email: user.email });
        return res.status(200).send({ token });
      })
    })
    .catch(next);
  //  return res.status(500).send('Server Error');
};

const getUsers = (req, res, next) => UserModel.find()
  .then((users) => res.status(200).send(users))
  .catch(next);

const getUserById = (req, res, next) => {
  UserModel.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        next(new BadRequestError(`Invalid Id Error: ${err.name}: ${err.message}`));
      }
      next(err);
    });
};

const updateUserById = (req, res, next) => UserModel
  .findByIdAndUpdate(req.user, req.body, { new: true, runValidators: true })
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.log(err);
    if (err.name === 'ValidationError') {
      next(new BadRequestError(`Incorrect user info: ${err.name}: ${err.message}`));
    }
    next(err);
  });

const updateUserAvatarById = (req, res, next) => UserModel
  .findByIdAndUpdate(req.user, { avatar: req.body.avatar }, { new: true, runValidators: true })
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.log(err);
    if (err.name === 'ValidationError') {
      next(new BadRequestError(`Incorrect user info error: ${err.name}: ${err.message}`));
    }
    next(err);
  });

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
  login,
};
