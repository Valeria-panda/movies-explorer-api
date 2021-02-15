const router = require('express').Router();
const { createUser, login, signout } = require('../controllers/users');
const { validateUser, validateLogin } = require('../middlewares/requestValidation');
const auth = require('../middlewares/auth');
const user = require('./users');
const movies = require('./movies');
const NotFoundError = require('../errors/notFoundError');
const { notFound } = require('../utils/constants');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);
router.get('/signout', auth, signout);

router.use(auth, user);
router.use(auth, movies);

router.use((req, res, next) => {
  next(new NotFoundError(notFound));
});

module.exports = router;
