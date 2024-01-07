const { createUser, getUsers, getUserById, updateUserById, updateUserAvatarById, login } = require('../controllers/users');
const Router = require('express').Router();
const auth = require('../middlewares/auth');
const errorHandler = require('../errors/error-handler');


Router.post('/signin', login);
Router.post('/signup', createUser);
Router.use(auth);
Router.get('/users', getUsers);
Router.get('/users/:userId', getUserById);
Router.patch('/users/me', updateUserById);
Router.patch('/users/me/avatar', updateUserAvatarById);
Router.use(errorHandler);
module.exports = Router;
