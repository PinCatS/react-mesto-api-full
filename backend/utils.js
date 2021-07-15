const ClientError = require('./errors/client-error');
const ConflictError = require('./errors/conflict-error');

/**
 * The pattern has been tested agains the below links on https://regexr.com/
 * as well as by executing the requets PATCH /users/me/avatar and POST /cards
 *    http://ya.ru
 *    https://www.ya.ru
 *    http://2-domains.ru
 *    http://ya.ru/path/to/deep/
 *    http://ya-ya-ya.ru
 *    http://ya.ru/path/to/deep/#
 *
 */
const linkValidationPattern = /^https?:\/\/(www.)?[\w\-.~:/?#[\]@!$&'()*+,;=]+#?$/;

const onError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new ClientError('Переданны некорректные данные'));
  } else if (err.name === 'MongoError' && err.code === 11000) {
    next(new ConflictError('Такой email уже существует'));
  }
  next(err);
};

module.exports = {
  onError,
  linkValidationPattern,
};
