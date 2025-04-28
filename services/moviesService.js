const db = require('../db/database');

const PAGE_SIZE = 50;

// Helper to format budget
const formatBudget = (budget) => {
  return `$${parseInt(budget).toLocaleString()}`;
};

// List All Movies
exports.getAllMovies = (page) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * PAGE_SIZE;
    db.all(
      `SELECT imdb_id, title, genres, release_date, budget FROM movies LIMIT ? OFFSET ?`,
      [PAGE_SIZE, offset],
      (err, rows) => {
        if (err) return reject(err);
        rows.forEach(row => row.budget = formatBudget(row.budget));
        resolve(rows);
      }
    );
  });
};

// Movie Details
exports.getMovieDetails = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT m.imdb_id, m.title, m.description, m.release_date, m.budget, 
             m.runtime, m.original_language, m.genres, 
             group_concat(pc.name) as production_companies, 
             (SELECT AVG(rating) FROM ratings WHERE movie_id = m.id) as average_rating
      FROM movies m
      LEFT JOIN movie_production_companies mpc ON m.id = mpc.movie_id
      LEFT JOIN production_companies pc ON mpc.production_company_id = pc.id
      WHERE m.imdb_id = ?
      GROUP BY m.id
      `,
      [id],
      (err, row) => {
        if (err) return reject(err);
        if (row) row.budget = formatBudget(row.budget);
        resolve(row);
      }
    );
  });
};

// Movies By Year
exports.getMoviesByYear = (year, page, sort) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * PAGE_SIZE;
    const order = sort.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    db.all(
      `
      SELECT imdb_id, title, genres, release_date, budget 
      FROM movies 
      WHERE strftime('%Y', release_date) = ? 
      ORDER BY release_date ${order}
      LIMIT ? OFFSET ?
      `,
      [year, PAGE_SIZE, offset],
      (err, rows) => {
        if (err) return reject(err);
        rows.forEach(row => row.budget = formatBudget(row.budget));
        resolve(rows);
      }
    );
  });
};

// Movies By Genre
exports.getMoviesByGenre = (genre, page) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * PAGE_SIZE;
    db.all(
      `
      SELECT imdb_id, title, genres, release_date, budget 
      FROM movies 
      WHERE genres LIKE ?
      LIMIT ? OFFSET ?
      `,
      [`%${genre}%`, PAGE_SIZE, offset],
      (err, rows) => {
        if (err) return reject(err);
        rows.forEach(row => row.budget = formatBudget(row.budget));
        resolve(rows);
      }
    );
  });
};
