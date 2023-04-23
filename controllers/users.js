const User = require('../models/user');
const {
  CODE,
  CODE_CREATED,
  ERROR_NOT_FOUND,
} = require('../utils/constants');

const { handleError } = require('../utils/handlers');

const checkUser = (user, res) => {
  if (user) {
    return res.send({ data: user });
  }
  return res
    .status(ERROR_NOT_FOUND)
    .send({ message: 'Пользователь по указанному _id не найден' });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CODE_CREATED).send(user))
    .catch((err) => handleError(err, res));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(CODE).send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.getUsersId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

const updateUser = (req, res, updateData) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  })
    .then((user) => checkUser(user, res))
    .catch((err) => handleError(err, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUser(req, res, { avatar });
};
