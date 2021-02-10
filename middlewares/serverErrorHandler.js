const { serverError } = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send(err.message);
    return;
  }
  res.status(500).send({ message: `${serverError} ${err.message}` });
  next();
});
