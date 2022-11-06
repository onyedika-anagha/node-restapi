const express = require("express");
const app = express();

const port = 3000;

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies = [
  {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    release_date: "2010-07-15",
  },
  {
    id: "2",
    title: "Sandman",
    director: "Christopher Nolan",
    release_date: "2020-07-15",
  },
];

//get the movies in the form of json
app.get("/movies", (req, res) => {
  res.json(movies);
});

// add movie to the list
app.post("/movie", (req, res) => {
  const movie = req.body;
  console.log(movie);
  if (movie.title == null) {
    return res.sendStatus(400);
  }
  movies.push(movie);
  res.send({ msg: "movie added to list.", movies });
});

// getting movie by id
app.get("/movie/:id", (req, res) => {
  const id = req.params.id;
  const found = movies.some((movie) => movie.id === id);

  for (let movie of movies) {
    if (movie.id === id) {
      res.json(movie);
      return;
    }
  }

  res.status(404).send("Movie not Found");
});

// delete movie by id
app.delete("/movie/:id", (req, res) => {
  const id = req.params.id;
  const found = movies.some((movie) => movie.id === id);
  if (found) {
    movies = movies.filter((movie) => movie.id !== id);
    res.json({
      msg: "movie has been deleted.",
      movies,
    });
  } else {
    res.status(404).send("movie not found");
  }
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
