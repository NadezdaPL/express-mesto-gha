const router = require('express').Router();
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const NotFound = require('../Error/NotFound');

router.use('/', signinRouter);
router.use('/', signupRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFound('По указанному адресу страница не найдена'));
});

module.exports = router;
