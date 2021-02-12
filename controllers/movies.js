const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const { badRequstError, forbiddenError, movieNotFound } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovies = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailer, thumbnail,
    nameRU, nameEN,
  } = req.body;

  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      nameRU,
      nameEN,
      owner: req.user._id,
    },
  )
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError({ message: badRequstError });
      }
      return res.send(movie);
    })
    .catch(next);
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError({ message: movieNotFound });
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError({ message: forbiddenError });
      }
      return Movie.findByIdAndDelete(req.params.movieId);
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
