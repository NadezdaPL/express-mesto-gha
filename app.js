require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const celebrateError = require('celebrate').errors;

// const auth = require('./middlewares/auth');
const router = require('./routes/index');
const error = require('./utils/handlers');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use('/', router);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(celebrateError());
app.use(error);
// app.use(auth);

// app.use((req, res) => {
//   res
//     .status(ERROR_NOT_FOUND)
//     .send({ message: `Страница не найдена ${ERROR_NOT_FOUND}` });
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
