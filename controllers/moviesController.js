const moviesService = require('../services/moviesService');

// List All Movies
exports.listAllMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await moviesService.getAllMovies(page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Movie Details
exports.getMovieDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await moviesService.getMovieDetails(id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Movies By Year
exports.getMoviesByYear = async (req, res) => {
  const year = req.params.year;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || 'asc';
  try {
    const movies = await moviesService.getMoviesByYear(year, page, sort);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Movies By Genre
exports.getMoviesByGenre = async (req, res) => {
  const genre = req.params.genre;
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await moviesService.getMoviesByGenre(genre, page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
