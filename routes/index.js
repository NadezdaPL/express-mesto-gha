const router = require('express').Router();
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const { handleError } = require('../utils/handlers');
const NotFound = require('../Error/NotFound');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res) => {
  const err = new NotFound('По указанному адресу страница не найдена');
  handleError(err, res);
});

module.exports = router;
