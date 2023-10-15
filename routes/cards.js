const {createCard, getCards, deleteCardById} = require('../controllers/cards');
const Router = require('express').Router();

Router.post('/cards', createCard);
Router.get('/cards', getCards);
Router.delete('/cards/:cardId', deleteCardById);

module.exports = Router;