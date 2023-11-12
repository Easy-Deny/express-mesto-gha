const { createUser, getUsers, getUserById, updateUserById, updateUserAvatarById, login } = require('../controllers/users');
const Router = require('express').Router();

Router.post('/signin', login);
Router.post('/signup', createUser);
Router.get('/users', getUsers);
Router.get('/users/:userId', getUserById);
Router.patch('/users/me', updateUserById);
Router.patch('/users/me/avatar', updateUserAvatarById);

module.exports = Router;
