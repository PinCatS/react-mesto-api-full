const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');
const User = require('../models/user');
const { onError } = require('../utils');

const MAX_AGE_WEEK = 3600000 * 24 * 7;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => onError(err, next));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => onError(err, next));
};

const getProfile = (req, res, next) => {
  const { _id } = req.user;

  console.log(res.header);

  User.findById(_id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => onError(err, next));
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    // Use user values returned by mongo, otherwise defaults won't be returned
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => onError(err, next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '1w' },
      );

      res.cookie('jwt', `Bearer ${token}`, {
        maxAge: MAX_AGE_WEEK,
        httpOnly: true,
      });

      res.send({ _id: user._id });
    })
    .catch((err) => next(new AuthError(err.message)));
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => onError(err, next));
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => onError(err, next));
};

module.exports = {
  login,
  getUsers,
  getUser,
  getProfile,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
