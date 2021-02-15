const rateLimit = require('express-rate-limit');
const { limitError } = require('./constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: limitError,
});

module.exports = limiter;
