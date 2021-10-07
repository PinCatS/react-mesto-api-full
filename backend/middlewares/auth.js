const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const AUTH_ERROR_MESSAGE = 'Ошибка авторизации';

module.exports = (req, res, next) => {
  const authorization = req.header('Authorization');

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthError(AUTH_ERROR_MESSAGE);
    }

    const token = authorization.replace('Bearer ', '');

    let payload;

    try {
      const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
      payload = jwt.verify(token, secretKey);
    } catch (err) {
      throw new AuthError(AUTH_ERROR_MESSAGE);
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
