const CardModel = require('../models/card');
cid = '652ac3e0588c4c642defffdc';

const createCard = (req, res) => {
  const { name, link } = req.body;
  return CardModel.create({ name, link, owner: req.user })
    .then((data) => {
      return res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: `Card not added: ${err.name}: ${err.message}` });
      }
      return res.status(500).send("Server Error");
    });
}

const getCards = (req, res) => {
  CardModel.find()
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch((err) => {
      return res.status(500).send("Server Error");
    });
}

const deleteCardById = (req, res) => {
  CardModel.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: `Card not found` });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        return res.status(400).send({ message: `Invalid Card Id: ${err.name}: ${err.message}` });
      }
      return res.status(500).send("Server Error");
    });
}
const likeCard = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: `Card not found` });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        return res.status(400).send({ message: `Like not added: ${err.name}: ${err.message}` });
      }
      return res.status(500).send("Server Error");
    });
}

const dislikeCard = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: `Card not found` });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        return res.status(400).send({ message: `Like not deleted: ${err.name}: ${err.message}` });
      }
      return res.status(500).send("Server Error");
    });
}

module.exports = {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard
}
