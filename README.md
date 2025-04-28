
---

# Movie API

A simple, clean Node.js + Express API built on top of a SQLite database, designed to retrieve movie data such as titles, genres, release dates, budgets, and ratings.

---

##  Tech Stack

- Node.js
- Express.js
- SQLite3
- Dotenv

---

##  Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/ashish277d/movie-api
cd movie-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file:

```bash
DATABASE_PATH=./db/movies.db
PORT=3000
```

4. **Start the server**

```bash
npm start
```

The server will start on `http://localhost:3000`

---

##  API Endpoints

### 1. List All Movies
**GET** `/movies?page=<page_number>`

- Lists 50 movies per page.
- Default page = 1.
- Returns: imdb_id, title, genres, release date, budget.

---

### 2. Movie Details
**GET** `/movies/:id`

- Provides full details of a movie:
  - imdb_id
  - title
  - description
  - release date
  - budget
  - runtime
  - average rating
  - genres
  - original language
  - production companies

---

### 3. Movies By Year
**GET** `/movies/year/:year?page=<page_number>&sort=asc|desc`

- Lists all movies from a specific year.
- Default sorting: ascending (oldest first).
- Supports `desc` for newest first.
- 50 movies per page.

---

### 4. Movies By Genre
**GET** `/movies/genre/:genre?page=<page_number>`

- Lists all movies that match a given genre (case insensitive).
- 50 movies per page.

---

##  Project Structure

```
movie-api/
├── app.js
├── db/
│   └── database.js
├── routes/
│   └── moviesRoutes.js
├── controllers/
│   └── moviesController.js
├── services/
│   └── moviesService.js
├── .env
├── package.json
└── README.md
```

