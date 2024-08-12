// Require express
const express = require('express'),
  morgan = require('morgan');
const app = express();

// Morgan used to log requests 
app.use(morgan('combined'));

// Add movie data
app.get('/movies', (req, res) => {
    const movies = [
        { title: "The Shawshank Redemption", director: "Frank Darabont" },
        { title: "The Godfather", director: "Francis Ford Coppola" },
        { title: "The Dark Knight", director: "Christopher Nolan" },
        { title: "Pulp Fiction", director: "Quentin Tarantino" },
        { title: "Forrest Gump", director: "Robert Zemeckis" },
        { title: "The Matrix", director: "The Wachowskis" },
        { title: "Inception", director: "Christopher Nolan" },
        { title: "Fight Club", director: "David Fincher" },
        { title: "The Lord of the Rings: The Return of the King", director: "Peter Jackson" },
        { title: "Star Wars: Episode V - The Empire Strikes Back", director: "Irvin Kershner" }
    ];
  res.json(movies);
});

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Serve static files
app.use(express.static('public'));

// Create error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Your app is listening on port 8080.');
});