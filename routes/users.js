const usersRouter = require('express').Router();

const {
  getUsers,
  getInfoProfile,
  getId,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { validateUserId, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/userValidator');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getInfoProfile);
usersRouter.get('/:userId', validateUserId, getId);
usersRouter.patch('/me', validateUpdateProfile, updateProfile);
usersRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = usersRouter;
