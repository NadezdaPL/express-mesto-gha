const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('./constants');

module.exports.handleError = (err, res) => {
  if (err instanceof ValidationError) {
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

  if (err instanceof CastError) {
    return res
      .status(ERROR_CODE)
      .send({ message: `Переданы некорректные данные ${ERROR_CODE}` });
  }
  return res
    .status(ERROR_INTERNAL_SERVER)
    .send({
      message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
    });
};

module.exports.errorNotFound = (req, res) => {
  res
    .status(ERROR_NOT_FOUND)
    .send({ message: 'По указанному адресу страница не найдена' });
};
