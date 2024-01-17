const { createUser, getUsers, getUserById, updateUserById, updateUserAvatarById, login } = require('../controllers/users');
const Router = require('express').Router();
const auth = require('../middlewares/auth');
const errorHandler = require('../errors/error-handler');
const { celebrate, Joi } = require('celebrate');
//name, about, avatar, email, password

Router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
Router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.link().required(),
    avatar: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
Router.use(auth);
Router.get('/users', getUsers);
Router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), getUserById);
Router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), updateUserById);
Router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), updateUserAvatarById);
Router.use(errorHandler);
module.exports = Router;
