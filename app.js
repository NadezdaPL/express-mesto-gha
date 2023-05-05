require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const helmet = require('helmet');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const NotFound = require('./Error/NotFound');
const { createUser, login } = require('./controllers/users');

const error = require('./utils/handlers');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(bodyParser.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(https?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=])*#?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(error);
app.use(auth);
app.use('/users', usersRouter);
app.use('/', cardsRouter);
app.use('*', NotFound);
app.use(errors());
// app.use(express.json());

// app.use(cookieParser());
// app.use(helmet());

// app.use(auth);

// app.use((req, res) => {
//   res
//     .status(ERROR_NOT_FOUND)
//     .send({ message: `Страница не найдена ${ERROR_NOT_FOUND}` });
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
