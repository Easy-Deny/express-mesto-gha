const { createCard, getCards, deleteCardById, likeCard, dislikeCard } = require('../controllers/cards');
const Router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

Router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/),
  }),
}), createCard);
Router.get('/cards', getCards);
Router.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string(),
  }),
}), deleteCardById);
Router.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string(),
  }),
}), likeCard);
Router.delete('/cards/:cardId/likes',
celebrate({
  body: Joi.object().keys({
    cardId: Joi.string(),
  }),
}), dislikeCard);

module.exports = Router;


