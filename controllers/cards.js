const cardModel = require('../models/card');

const createCard = (req, res) => {
  const cardData = req.body;
  return cardModel.create(cardData)
    .then((data) => {
      return res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(400).send(`Card not added: ${err.message}`);
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
  const { id } = req.params;
  cardModel.findByIdAndRemove(id)
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

module.exports = {
  createCard,
  getCards,
  deleteCardById,
}
