const Card = require('../models/card.js');
const NotFoundError = require('../middleware/notFoundError');

const getCards = (req, res) => {
  Card.find({}).then((cards) => {
    res.status(200).send(cards);
  })
    .catch(() => res.status(500).send({ message: 'Sever Error' }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner }).then((card) => {
    res.status(200).send(card);
  })
    .catch(() => res.status(400).send({ message: 'Card cannot be created' }));
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).then((card) => {
    if (!card) {
      throw new NotFoundError('No card with such ID');
    }
    if (String(card.owner) !== req.user._id) {
      throw new NotFoundError('You do not have permission');
    }
    return Card.remove(card).then(() => {
      res.send({ data: card });
    });
  }).catch(next);
};

const likeCard = (req, res, next) => updateLike(req, res, next, '$addToSet');
const unLikeCard = (req, res, next) => updateLike(req, res, next, '$pull');

const updateLike = (req, res, next, method) => {
  // const method === req.method === 'DELETE' ? '$pull' : '$addToSet'
  Card.findByIdAndUpdate(req.params.id, { [method]: { likes: req.user._id } })
    .then(card => res.status(200).send(card);)
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new NotFoundError('No card with such ID');
      }

      next(err);
    });
};



// const likeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   ).then((likeId) => {
//     if (likeId === null) {
//       throw new NotFoundError('No card with such ID');
//     }
//     return res.send();
//   }).catch(next);
// };

// const unLikeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   ).then((likeId) => {
//     if (likeId === null) {
//       throw new NotFoundError('No card with such ID');
//     }
//     return res.send();
//   }).catch(next);
// };

module.exports = {
  getCards, createCard, deleteCard, likeCard, unLikeCard,
};
