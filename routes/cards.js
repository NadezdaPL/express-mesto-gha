const cardsRouter = require('express').Router();

const { getCards, createCards, deleteCards } = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCards);
cardsRouter.delete('/:cardId', deleteCards);

module.exports = cardsRouter;
