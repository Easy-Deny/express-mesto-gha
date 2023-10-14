const {createUser, getUsers, getUserById, updateUserById, deleteUserById} = require('../controllers/users');
const Router = require('express').Router();

Router.post('/users', createUser);
Router.get('/users', getUsers);
Router.get('/users/:id', getUserById);

module.exports = Router;