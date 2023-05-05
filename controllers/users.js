const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const {
  CODE,
  CODE_CREATED,
  ERROR_NOT_FOUND,
} = require('../utils/constants');

const checkUser = (user, res) => {
  if (user) {
    return res.send({ data: user });
  }
  return res
    .status(ERROR_NOT_FOUND)
    .send({ message: 'Пользователь по указанному _id не найден' });
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
    .then((user) => res.status(CODE_CREATED).send({ data: user }))
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
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        });

      return res
        .status(CODE)
        .send({ data: user, token });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(CODE).send({ data: user }))
    .catch(next);
};

module.exports.getInfoProfile = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUsersId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
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

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUser(req, res, { avatar });
};
