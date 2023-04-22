const usersRouter = require('express').Router();

const { getUsers, getUsersId, createUser } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUsersId);
usersRouter.post('/', createUser);

module.exports = usersRouter;
