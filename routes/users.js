const user = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUserUpdate } = require('../middlewares/requestValidation');

user.get('/users/me', getUser);
user.put('/users/me', validateUserUpdate, updateUser);

module.exports = user;
