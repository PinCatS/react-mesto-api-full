const validator = require('validator');
const ClientError = require('./errors/client-error');
const ConflictError = require('./errors/conflict-error');

const urlValidator = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

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
  urlValidator,
};
