const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errors-handler');
const cors = require('./middlewares/cors');
const {
  login,
  createUser,
} = require('./controllers/users');

const app = express();

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({
      scheme: ['http', 'https'],
    }),
  }),
}), createUser);

app.use(cookieParser());
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', require('./routes/catchall'));

app.use(errorLogger);

/* Handle celebrate errors */
app.use(errors());

/* Handle all errors */
app.use(errorsHandler);

app.listen(PORT, () => {});
