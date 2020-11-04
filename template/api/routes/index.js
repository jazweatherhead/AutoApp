var express = require('express');
var router = express.Router();
var ctrlMovies = require('../controllers/movies');

/* Movies */
router.get('/movies', ctrlMovies.moviesList); // list all
router.post('/movies', ctrlMovies.moviesCreate); // C
router.get('/movies/:movieid', ctrlMovies.moviesReadOne); // R
router.put('/movies/:movieid', ctrlMovies.moviesUpdateOne); // U
router.delete('/movies/:movieid', ctrlMovies.moviesDeleteOne); // D

module.exports = router;