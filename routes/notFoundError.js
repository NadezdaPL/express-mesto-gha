const errorNotFoundRouter = require('express').Router();
const { errorNotFound } = require('../utils/notFound');

errorNotFoundRouter.all('/*', errorNotFound);

module.exports = errorNotFoundRouter;
