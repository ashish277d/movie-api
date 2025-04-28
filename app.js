require('dotenv').config();
const express = require('express');
const moviesRoutes = require('./routes/moviesRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/movies', moviesRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
