const Card = require('../models/card');
const {
  CODE,
  CODE_CREATED,
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
  handleError,
} = require('../constants');

// module.exports.getCards = (req, res) => {
//   Card.find({})
//     .then((card) => {
//       res
//         .send(card);
//     })
//     .catch(() => {
//       res
//         .status(ERROR_INTERNAL_SERVER)
//         .send({ message: `Внутренняя ошибка сервера ${ERROR_INTERNAL_SERVER}` });
//     });
// };

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res
        .send(card);
    })
    .catch((error) => handleError(error, res));
};

// module.exports.createCards = (req, res) => {
//   const { name, link } = req.body;
//   const { _id } = req.user;
//   Card.create({ name, link, owner: _id })
//     .then((card) => {
//       res
//         .status(CODE_CREATED)
//         .send(card);
//     })
//     .catch((error) => {
//       if (error.name === 'error') {
//         return res
//           .status(ERROR_CODE)
//           .send({
//             message: 'Переданы некорректные данные при создании карточки',
//           });
//       }
//       return res
//         .status(ERROR_INTERNAL_SERVER)
//         .send({ message: `Внутренняя ошибка сервера ${ERROR_INTERNAL_SERVER}` });
//     });
// };

// module.exports.createCards = (req, res) => {
//   const { name, link } = req.body;
//   const cardId = req.user._id;
//   Card.create({ name, link, owner: cardId })
//     .then((card) => card.populate('owner'))
//     .then((card) => res.status(CODE_CREATED).send(card))
//     .catch(() => {
//       res
//         .status(ERROR_INTERNAL_SERVER)
//         .send({ message: `Внутренняя ошибка сервера ${ERROR_INTERNAL_SERVER}` });
//     });
// };

// module.exports.createCards = (req, res) => {
//   const { name, link } = req.body;
//   const cardId = req.user._id;
//   Card.create({ name, link, owner: cardId })
//     .then((card) => card.populate('owner'))
//     .then((card) => res.status(CODE_CREATED).send(card))
//     .catch((error) => handleError(error, res));
// };

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CODE_CREATED).send({ data: card }))
    .catch((error) => handleError(error, res));
};

// module.exports.deleteCards = (req, res) => {
//   const { cardId } = req.params;
//   Card.deleteOne({ _id: cardId })
//     .then((card) => {
//       res
//         .status(CODE)
//         .send(card);
//     })
//     .catch((error) => handleError(error, res));
// };

module.exports.deleteCards = (req, res) => {
  const { cardId } = req.params;
  Card.findOneAndDelete({ _id: cardId })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((error) => handleError(error, res));
};

// module.exports.likeCard = (req, res) =>
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   );

// module.exports.dislikeCard = (req, res) =>
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   );
