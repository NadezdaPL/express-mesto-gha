const router = require('express').Router();
const signInRouter = require('./signin');
const signUpRouter = require('./signup');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const errorNotFoundRouter = require('./notFoundError');
const auth = require('../middlewares/auth');

router.use('/signin', signInRouter);
router.use('/signup', signUpRouter);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', errorNotFoundRouter);

module.exports = router;
