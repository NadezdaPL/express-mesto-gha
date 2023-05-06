const signinRouter = require('express').Router();

const { login } = require('../controllers/users');
const { validateSignin } = require('../middlewares/userValidator');

signinRouter.post('/signin', validateSignin, login);

module.exports = signinRouter;
