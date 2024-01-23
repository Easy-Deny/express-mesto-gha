const { celebrate, Joi } = require('celebrate');
const Router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUser,
  updateUserAvatarById,
  login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

Router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
Router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required(),
    avatar: Joi.string().required().pattern(/^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
Router.use(auth);
Router.get('/users/me', updateUser);
Router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
Router.get('/users', getUsers);
Router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required(),
  }),
}), updateUserById);
Router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/),
  }),
}), updateUserAvatarById);
module.exports = Router;
