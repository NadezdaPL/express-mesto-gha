const Forbidden = require('../Error/Forbidden');
const NotFound = require('../Error/NotFound');
const Card = require('../models/card');
const {
  CODE,
  CODE_CREATED,
  ERROR_NOT_FOUND,
} = require('../utils/constants');

const checkCard = (card, res) => {
  if (card) {
    return res.send({ data: card });
  }
  return res
    .status(ERROR_NOT_FOUND)
    .send({ message: `Карточка с указанным _id не найдена ${ERROR_NOT_FOUND}` });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((card) => {
      res.status(CODE).send({ data: card });
    })
    .catch(next);
};

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CODE_CREATED).send({ data: card }))
    .catch(next);
};

module.exports.deleteCards = (req, res, next) => {
  const _id = req.params.cardId;

  Card.findOne({ _id })
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка была удалена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new Forbidden('Вы не можете удалить карточку другого пользователя');
      }
      Card.findByIdAndDelete({ _id })
        .populate([
          { path: 'owner', model: 'user' },
        ])
        .then((cardDeleted) => {
          res.send({ data: cardDeleted });
        });
    })
    .catch(next);
};

const updateLikes = (req, res, updateData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((user) => checkCard(user, res))
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  const owner = req.user._id;
  const newData = { $addToSet: { likes: owner } };
  updateLikes(req, res, newData, next);
};

module.exports.removeLike = (req, res, next) => {
  const owner = req.user._id;
  const newData = { $pull: { likes: owner } };
  updateLikes(req, res, newData, next);
};
