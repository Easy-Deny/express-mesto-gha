const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
//const { MongoServerError } = require('mongoose').Error;

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) =>{
      UserModel.create({ name, about, avatar, email, password: hash })
        .then((data) => {
          return res.status(201).send(data);
        })
        .catch((err) => {
          console.log(err);
          if (err.name === 'ValidationError') {
            return res.status(400).send({ message: `Incorrect user info error: ${err.name}: ${err.message}` });
          }
          if (err.code === 11000) {
            return res.status(409).send({ message: `user with an email address exists: ${err.name}: ${err.message}` });
          }
          return res.status(500).send('Server Error');
        });
      });
};
const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch(() => {
      return res.status(500).send('Server Error');
    });
};

const getUserById = (req, res) => {
  UserModel.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Invalid Id Error: ${err.name}: ${err.message}` });
      }
      return res.status(500).send('Server Error');
    });
};

const updateUserById = (req, res) => {
  return UserModel.findByIdAndUpdate(req.user, req.body, { new: true, runValidators: true })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Incorrect user info: ${err.name}: ${err.message}` });
      }
      return res.status(500).send('Server Error');
    });
}

const updateUserAvatarById = (req, res) => {
  return UserModel.findByIdAndUpdate(req.user, { avatar: req.body.avatar }, { new: true, runValidators: true })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Incorrect user info error: ${err.name}: ${err.message}` });
      }
      return res.status(500).send('Server Error');
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
};
