const User = require('../models/user');
const {
  CODE,
  CODE_CREATED,
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CODE_CREATED).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: `Ошибка загрузки данных ${ERROR_CODE}` });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({
        message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}`,
      });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(CODE).send(users))
    .catch(() => res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}` }));
};

module.exports.getUsersId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res
        .status(ERROR_NOT_FOUND)
        .send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(ERROR_CODE)
          .send({ message: `Ошибка загрузки данных ${ERROR_CODE}` });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({
        message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}`,
      });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate({ name, about }, userId, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res
        .status(ERROR_NOT_FOUND)
        .send({
          message: `Пользователь с указанным _id не найден ${ERROR_NOT_FOUND}`,
        });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({
            message: `Переданы некорректные данные при обновлении профиля ${ERROR_CODE}`,
          });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({
        message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}`,
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const avatar = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(avatar, userId, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res
        .status(ERROR_NOT_FOUND)
        .send({
          message: `Пользователь с указанным _id не найден ${ERROR_NOT_FOUND}`,
        });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({
            message: `Переданы некорректные данные при обновлении аватара ${ERROR_CODE}`,
          });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({
        message: `На сервере произошла ошибка ${ERROR_INTERNAL_SERVER}`,
      });
    });
};
