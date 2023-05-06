const signupRouter = require('express').Router();

const { createUser } = require('../controllers/users');
const { validateSignup } = require('../middlewares/userValidator');

signupRouter.post('/signup', validateSignup, createUser);

module.exports = signupRouter;

// signupRouter.post('/', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().regex(REGEX),
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), createUser);
