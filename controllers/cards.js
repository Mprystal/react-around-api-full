const Card = require('../models/card.js');

const getCards = (req, res) => {
  Card.find({}).then((cards) => { res.status(200).send(cards); }).catch(() => res.status(500).send({ message: 'Sever Error' }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner }).then((card) => { res.status(200).send(card); })
    .catch(() => res.status(400).send({ message: 'Card cannot be created' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'No card with such id' });
    }
    return res.send({ data: card });
  })
    .catch(() => res.status(400).send({ message: 'Card cannot be deleted' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((likeId) => {
    if (likeId === null) {
      return res.status(404).send({ message: 'No card with such id' });
    }
    return res.send();
  }).catch(() => res.status(400).send({ message: 'Card cannot be liked' }));
};

const unLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((likeId) => {
    if (likeId === null) {
      return res.status(404).send({ message: 'No card with such id' });
    }
    return res.send();
  }).catch(() => res.status(400).send({ message: 'Card cannot be unLiked' }));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, unLikeCard,
};
