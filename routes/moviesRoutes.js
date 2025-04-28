const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// List all movies
router.get('/', moviesController.listAllMovies);

// Movie details by ID
router.get('/:id', moviesController.getMovieDetails);

// Movies by year
router.get('/year/:year', moviesController.getMoviesByYear);

// Movies by genre
router.get('/genre/:genre', moviesController.getMoviesByGenre);

module.exports = router;
