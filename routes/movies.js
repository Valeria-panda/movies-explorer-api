const movies = require('express').Router();
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { validateId, validateMovies } = require('../middlewares/requestValidation');

movies.get('/movies', getMovies);
movies.post('/movies', validateMovies, createMovies);
movies.delete('/movies/:movieId', validateId, deleteMovies);

module.exports = movies;
