const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

const sendResNotFoundError = (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден'));

router.get('*', sendResNotFoundError);
router.post('*', sendResNotFoundError);
router.patch('*', sendResNotFoundError);
router.put('*', sendResNotFoundError);
router.delete('*', sendResNotFoundError);

module.exports = router;
