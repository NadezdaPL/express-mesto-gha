const usersRouter = require('express').Router();

const {
  getUsers,
  getUsersId,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUsersId);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
