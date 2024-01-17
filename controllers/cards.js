const CardModel = require('../models/card');
const BadRequestError = require('../errors/badrequest-error');
const NotFoundError = require('../errors/not-found-error');
const NotRightError = require('../errors/not-right-error');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  return CardModel.create({ name, link, owner: req.user })
    .then((data) => {
      return res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Card not added: ${err.name}: ${err.message}`));
        //return res.status(400).send({ message: `Card not added: ${err.name}: ${err.message}` });
      } else {
        next(err); //new ServerError('Server Error'));
      }
      //return res.status(500).send('Server Error');
    });
}

const getCards = (req, res, next) => {
  CardModel.find()
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch(() => {
      return res.status(500).send('Server Error');
    });
}

const deleteCardById = (req, res, next) => {
  CardModel.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
        //return res.status(404).send({ message: 'Card not found' });
      }
      if (!card.owner.equals(req.user._id)) {
        throw new NotRightError('Card not deleted');
      }
      card.deleteOne()
        .then(() => res.status(200).send(card))
        .catch(next);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        next(new BadRequestError(`Invalid Card Id: ${err.name}: ${err.message}`));
        //return res.status(400).send({ message: `Invalid Card Id: ${err.name}: ${err.message}` });
      } else {
        next(err);
      }
      //return res.status(500).send('Server Error');
    });
}
const likeCard = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
        //return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Like not added: ${err.name}: ${err.message}`));
        //return res.status(400).send({ message: `Like not added: ${err.name}: ${err.message}` });
      } else {
        next(err);
      }
      //return res.status(500).send('Server Error');
    });
}

const dislikeCard = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
        //return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        next(new BadRequestError(`Like not deleted: ${err.name}: ${err.message}`));
        // return res.status(400).send({ message: `Like not deleted: ${err.name}: ${err.message}` });
      } else {
        next(err);
      }
      //return res.status(500).send('Server Error');
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
};
