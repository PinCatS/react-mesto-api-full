const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  getProfile,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const { linkValidationPattern } = require('../utils');

router.get('/', getUsers);
router.get('/me', getProfile);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkValidationPattern),
  }),
}), updateUserAvatar);

module.exports = router;
