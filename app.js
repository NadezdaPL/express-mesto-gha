const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { ERROR_NOT_FOUND } = require('./constants');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6442820d98c2de49a80020b8',
  };

  next();
});

app.use('/', router);

// app.use((req, res) => {
//   res
//     .status(ERROR_NOT_FOUND)
//     .send({ message: `Страница не найдена ${ERROR_NOT_FOUND}` });
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
