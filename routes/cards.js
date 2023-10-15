const {createCard, getCards, deleteCardById, likeCard, dislikeCard} = require('../controllers/cards');
const Router = require('express').Router();

Router.post('/cards', createCard);
Router.get('/cards', getCards);
Router.delete('/cards/:cardId', deleteCardById);
Router.put('/cards/:cardId/likes', likeCard);
Router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = Router;