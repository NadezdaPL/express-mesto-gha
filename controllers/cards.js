const Card = require('../models/card');
const {
  CODE,
  CODE_CREATED,
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.status(CODE).send(card);
    })
    .catch(() => {
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({
          message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}`,
        });
    });
};

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CODE_CREATED).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({
            message: `Переданы некорректные данные при создании карточки ${ERROR_CODE}`,
          });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({
        message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}`,
      });
    });
};

module.exports.deleteCards = (req, res) => {
  const { cardId } = req.params;
  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (card.deletedCount !== 0) {
        return res.send({ message: 'Карточка была удалена' });
      }
      return res
        .status(ERROR_NOT_FOUND)
        .send({
          message: `Карточка с указанным _id не найдена ${ERROR_NOT_FOUND}`,
        });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({
            message: `Переданы некорректные данные при создании карточки ${ERROR_CODE}`,
          });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({
        message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}`,
      });
    });
};

module.exports.putLike = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({
            message: `Передан несуществующий _id карточки ${ERROR_NOT_FOUND}`,
          });
      }
      return res.status(CODE).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({
            message: `Переданы некорректные данные для постановки/снятии лайка. ${ERROR_CODE}`,
          });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({
        message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}`,
      });
    });
};

module.exports.removeLike = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({
            message: `Передан несуществующий _id карточки ${ERROR_NOT_FOUND}`,
          });
      }
      return res.status(CODE).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({
            message: `Переданы некорректные данные для постановки/снятии лайка. ${ERROR_CODE}`,
          });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({
        message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}`,
      });
    });
};
