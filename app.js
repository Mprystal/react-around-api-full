const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

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

app.use((req, res, next) => {
  req.user = {
    _id: '5fea1af510a53f652485ecf7',
  };

  next();
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRouter);
app.use('/', cardRouter);

app.get('*', (req, res) => {
  res.status(404).send('{ "message": "Requested resource not found" }');
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
