const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const NotFoundError = require('../middleware/notFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res) => {
  User.find({}).then((users) => {
    res.status(200).send(users);
  })
    .catch(() => res.status(500).send({ message: 'Sever Error' }));
};

const getUser = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    if (!user) {
      throw new NotFoundError('The provided token is invalid');
    }
    return res.status(200).send({ user });
  })
    .catch(console.log(req), next);
};

const getUsersById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user with matching ID found');
      }
      return res.status(200).send(user);
    }).catch(next);
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({ data: user.toJSON() });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res
          .status(409)
          .send({ message: err.message });
      }
      res.status(400).send({ message: 'User cannot be created' });
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((profile) => {
      if (!profile) {
        throw new NotFoundError('Not valid profile ID');
      }
      return res.send({ data: profile });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((userAvatar) => {
      if (!userAvatar) {
        throw new NotFoundError('Not valid profile ID');
      }
      return res.send({ data: userAvatar });
    })
    .catch(next);
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });

      return res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers, getUser, getUsersById, createUser, updateProfile, updateAvatar, login,
};
