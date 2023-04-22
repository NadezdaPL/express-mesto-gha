const CODE = 200;
const CODE_CREATED = 201;
const ERROR_CODE = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER = 500;

const { CastError, ValidationError, DocumentNotFoundError } = require('mongoose').Error;

module.exports.handleError = (error, res) => {
  if (error instanceof CastError) {
    return res.status(ERROR_CODE).send({
      message: `Переданы некорректные данные при создании карточки ${ERROR_CODE}`,
    });
  }
  if (error instanceof ValidationError) {
    return res.status(ERROR_CODE).send({
      message: `Ошибка загрузки данных ${ERROR_CODE}`,
    });
  }
  if (error instanceof DocumentNotFoundError) {
    return res.status(ERROR_NOT_FOUND).send({
      message: `Карточка с указанным _id не найдена ${ERROR_NOT_FOUND}`,
    });
  }
  return res
    .status(ERROR_INTERNAL_SERVER)
    .send({ message: `Внутренняя ошибка сервера ${ERROR_INTERNAL_SERVER}` });
};

module.exports = {
  CODE,
  CODE_CREATED,
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
};
