const movies = require('express').Router();
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { validateId, validateMovies } = require('../middlewares/requestValidation');

movies.get('/movies', getMovies); // возвращает все сохранённые пользователем фильмы
movies.post('/movies', validateMovies, createMovies); // создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail
movies.delete('/movies/movieId', validateId, deleteMovies); // удаляет сохранённый фильм по _id

module.exports = movies;