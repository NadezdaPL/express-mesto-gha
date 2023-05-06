const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCards,
  deleteCards,
  putLike,
  removeLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(/(https?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*#?$/),
  }),
}), createCards);
cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().length(24).required().hex() }),
}), deleteCards);
cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().length(24).required().hex() }),
}), putLike);
cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().length(24).required().hex() }),
}), removeLike);

module.exports = cardsRouter;
