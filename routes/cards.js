const cardsRouter = require('express').Router();

const {
  getCards,
  createCards,
  deleteCards,
  putLike,
  removeLike,
} = require('../controllers/cards');
const { validateCardId, validateCard } = require('../middlewares/cardValidator');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateCard, createCards);
cardsRouter.delete('/:cardId', validateCardId, deleteCards);
cardsRouter.put('/:cardId/likes', validateCardId, putLike);
cardsRouter.delete('/:cardId/likes', validateCardId, removeLike);
module.exports = cardsRouter;
