const movies = require('express').Router();
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { validateMovieId, validateMovies } = require('../middlewares/requestValidation');

movies.get('/movies', getMovies);
movies.post('/movies', validateMovies, createMovies);
movies.delete('/movies/:movieId', validateMovieId, deleteMovies);

module.exports = movies;
