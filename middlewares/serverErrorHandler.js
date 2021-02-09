const { serverError } = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `${serverError} ${err.message}` });
  next();
});