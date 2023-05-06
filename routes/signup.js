const signupRouter = require('express').Router();

const { createUser } = require('../controllers/users');
const { validateSignup } = require('../middlewares/userValidator');

signupRouter.post('/signup', validateSignup, createUser);

module.exports = signupRouter;
