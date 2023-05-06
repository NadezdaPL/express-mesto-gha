const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
  ERROR_INTERNAL_SERVER,
} = require('./constants');
const Unauthorized = require('../Error/Unauthorized');
const NotFound = require('../Error/NotFound');
const Forbidden = require('../Error/Forbidden');

module.exports = (err, req, res, next) => {
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(ERROR_CODE)
      .send({ message: `Переданы некорректные данные ${ERROR_CODE}` });
  }

  if (err instanceof DocumentNotFoundError) {
    return res
      .status(ERROR_NOT_FOUND)
      .send({
        message: `Пользователь с указанным _id не найден ${ERROR_NOT_FOUND}`,
      });
  }

  if (err instanceof NotFound || err instanceof Unauthorized || err instanceof Forbidden) {
    const { message } = err;
    return res
      .status(err.type)
      .send({ message });
  }

  if (err.code === 11000) {
    return res
      .status(ERROR_CONFLICT)
      .send({ message: 'Адрес электронной почты уже зарегистрирован' });
  }

  res
    .status(ERROR_INTERNAL_SERVER)
    .send({
      message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
    });

  return next();
};

// module.exports = (err, req, res, next) => {
//   if (err instanceof ValidationError) {
//     return res
//       .status(ERROR_CODE)
//       .send({ message: `Переданы некорректные данные ${ERROR_CODE}` });
//   }

//   if (err instanceof DocumentNotFoundError) {
//     return res
//       .status(ERROR_NOT_FOUND)
//       .send({
//         message: `Пользователь с указанным _id не найден ${ERROR_NOT_FOUND}`,
//       });
//   }

//   if (err instanceof CastError) {
//     return res
//       .status(ERROR_CODE)
//       .send({ message: `Переданы некорректные данные ${ERROR_CODE}` });
//   }

//   if (err instanceof Unauthorized) {
//     return res
//       .status(err.type)
//       .send({ message: err.message });
//   }

//   if (err instanceof Forbidden) {
//     return res
//       .status(err.type)
//       .send({ message: err.message });
//   }

//   if (err instanceof NotFound) {
//     return res
//       .status(err.type)
//       .send({ message: err.message });
//   }

//   if (err.code === 11000) {
//     return res
//       .status(ERROR_CONFLICT)
//       .send({ message: 'Адрес электронной почты уже зарегистрирован' });
//   }

//   res
//     .status(ERROR_INTERNAL_SERVER)
//     .send({
//       message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
//     });

//   return next();
// };
