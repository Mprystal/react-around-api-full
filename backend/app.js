require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');
const NotFoundError = require('./middleware/notFoundError');

const { PORT = 3000 } = process.env;

const app = express();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://around.nomoreparties.co');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
});

app.use(cors());
app.options('*', cors());

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'https://around.nomoreparties.co');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   next();
// });

// Still working on getting this up
// app.set('trust proxy', 1);

// const limiter = rateLimit({
//   windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
//   max: 100,
//   message: 'You have exceeded the 100 requests in 24 hrs limit!',
//   headers: true,
// });

// app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}),
createUser);

app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);

app.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'An error occurred on the server' : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
