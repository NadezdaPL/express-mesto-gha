const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const {
  CODE,
  CODE_CREATED,
  ERROR_NOT_FOUND,
} = require('../utils/constants');
const Unauthorized = require('../Error/Unauthorized');

const checkUser = (user, res) => {
  if (user) {
    return res.send({ data: user });
  }
  return res
    .status(ERROR_NOT_FOUND)
    .send({ message: 'Пользователь по указанному _id не найден' });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(CODE).send(user))
    .catch(next);
};

const getUsersId = (req, res, data, next) => {
  User.findById(data)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getId = (req, res, next) => {
  const data = req.user.userId;
  getUsersId(req, res, data, next);
};

module.exports.getInfoProfile = (req, res, next) => {
  const data = req.user._id;
  getUsersId(req, res, data, next);
};

const updateUser = (req, res, updateData, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  })
    .then((user) => checkUser(user, res))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about }, next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req, res, { avatar }, next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res
      .status(CODE_CREATED)
      .send({ data: user }))

    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        });
      return res.status(CODE).send({ data: user, token });
    })
    .catch(next);
};
