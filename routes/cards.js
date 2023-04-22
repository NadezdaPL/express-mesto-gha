const cardsRouter = require('express').Router();

const {
  getCards,
  createCards,
  deleteCards,
  putLike,
  removeLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCards);
cardsRouter.delete('/:cardId', deleteCards);
cardsRouter.put('/:cardId/likes', putLike);
cardsRouter.delete('/:cardId/likes', removeLike);

module.exports = cardsRouter;
