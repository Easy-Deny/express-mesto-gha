const cardModel = require('../models/card');

const createCard = (req, res) => {
  return cardModel.create(req.body)
    .then((data) => {
      return res.status(200).send(data._id);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({message:`Card not added: ${err.name}: ${err.message}`});
      }
      return res.status(500).send("Server Error");
    });
}

const getCards = (req, res) => {
  cardModel.find()
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch((err) => {
      return res.status(500).send("Server Error");
    });
}

const deleteCardById = (req, res) => {
  cardModel.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      return res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        return res.status(400).send("Invalid Id");
      }
      return res.status(500).send("Server Error");
    });
  }
  const likeCard = (req, res) => Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )

  const dislikeCard = (req, res) => Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )


module.exports = {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard
}
