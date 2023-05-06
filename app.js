require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const helmet = require('helmet');
// const bodyParser = require('body-parser');
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
// app.use(bodyParser.json());

app.use(express.json());

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
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', () => {
  throw new NotFound('Запрашиваемая страница не найдена');
});
app.use(errors());

// app.use(cookieParser());
// app.use(helmet());

// app.use(auth);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'Ошибка на сервере' : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
