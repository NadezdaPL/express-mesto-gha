const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { ERROR_UNAUTHORIZED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: 'Нужно пройти авторизацию' });
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: 'Нужно пройти авторизацию' });
  }

  req.user = payload;

  return next();
};

// const jwt = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = process.env;
// const { ERROR_UNAUTHORIZED } = require('../utils/constants');

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res
//       .status(ERROR_UNAUTHORIZED)
//       .send({ message: 'Нужно пройти авторизацию' });
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
//   } catch (err) {
//     return res
//       .status(ERROR_UNAUTHORIZED)
//       .send({ message: 'Нужно пройти авторизацию' });
//   }

//   req.user = payload;

//   return next();
// };
