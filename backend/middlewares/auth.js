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
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      throw new AuthError(AUTH_ERROR_MESSAGE);
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
