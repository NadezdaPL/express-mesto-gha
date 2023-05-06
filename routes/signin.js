const signinRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const { login } = require('../controllers/users');
const { validateSignin } = require('../middlewares/userValidator');

signinRouter.post('/signin', validateSignin, login);

module.exports = signinRouter;

// const signinRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

// const { login } = require('../controllers/users');

// signinRouter.post('/', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   }),
// }), login);

// module.exports = signinRouter;
