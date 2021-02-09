const user = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUserUpdate } = require('../middlewares/requestValidation');

user.get('/users/me', getUser); //возвращает информацию о пользователе (email и имя)
user.patch('/users/me', validateUserUpdate, updateUser); //обновляет информацию о пользователе (email и имя)

module.exports = user;