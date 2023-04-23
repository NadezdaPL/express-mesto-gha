const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const errorNotFoundRouter = require('./notFoundError');

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.use('*', errorNotFoundRouter);

module.exports = router;
