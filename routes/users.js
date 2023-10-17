const { createUser, getUsers, getUserById, updateUserById, updateUserAvatarById } = require('../controllers/users');
const Router = require('express').Router();

Router.post('/users', createUser);
Router.get('/users', getUsers);
Router.get('/users/:userId', getUserById);
Router.patch('/users/me', updateUserById);
Router.patch('/users/me/avatar', updateUserAvatarById);

module.exports = Router;
