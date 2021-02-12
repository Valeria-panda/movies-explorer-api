const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const { conflictError, notFound, badRequstError } = require('../utils/constants');

const { JWT_SECRET } = require('../utils/config');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError({ message: conflictError });
      } else next(err);
    })
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({
          email: user.email, name: user.name, token,
        });
    })
    .catch(next);
};
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: notFound });
      }
      res.send(user);
    })
    .catch(next);
};
const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new BadRequestError({ message: badRequstError });
      }
      res.send(user);
    })
    .catch(next);
};

const signout = (req, res) => {
  res
    .clearCookie('jwt', { httpOnly: true, sameSite: true })
    .send({ message: 'Выход' });
};

module.exports = {
  createUser,
  login,
  getUser,
  updateUser,
  signout,
};
