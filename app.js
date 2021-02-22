require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middleware/auth');

const { PORT = 3000 } = process.env;

const app = express();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);

app.get('*', (req, res) => {
  res.status(404).send('{ "message": "Requested resource not found" }');
});

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
