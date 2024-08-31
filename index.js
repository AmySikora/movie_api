// Require Mongoose
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

// mongoose connect
mongoose.connect('mongodb://localhost:27017/moviesDB'); 
// useNewUrlParser: true, useUnifiedTopology: true });

// Require express, Morgan, body-parser, and uuid
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// Serve static files
app.use(express.static('public'));

// Morgan used to log requests 
app.use(morgan('combined'));

// Body-Parser
app.use(bodyParser.json());

let users = [
{
  id: 1,
  name: "Kim",
  favoriteMovies: []
},
{
  id: 2,
  name: "Joe",
  favoriteMovies: ['The Godfather']
},
]

// Add movies
let movies = [
        { 
          "Title": "The Shawshank Redemption", 
          "Description": "The Shawshank Redemption is a 1994 American prison drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella Rita Hayworth and Shawshank Redemption. The film tells the story of banker Andy Dufresne (Tim Robbins), who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence. Over the following two decades, he befriends a fellow prisoner, contraband smuggler Ellis 'Red' Redding (Morgan Freeman), and becomes instrumental in a money laundering operation led by the prison warden Samuel Norton (Bob Gunton). William Sadler, Clancy Brown, Gil Bellows, and James Whitmore appear in supporting roles.",
          "Genre": {
            "Name": "Drama",
            "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
          },
          "Director": {
            "Name": "Frank Darabont",
            "Bio": "Frank Árpád Darabont (born Ferenc Árpád Darabont, January 28, 1959)[2] is an American screenwriter, director and producer. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors (1987), The Blob (1988) and The Fly II (1989).",
            "Birth": "January 28, 1959",
          },  
          "ImageURL": "https://en.wikipedia.org/wiki/File:ShawshankRedemptionMoviePoster.jpg",
          "Featured": false
        },
        {
          "Title": "The Godfather", 
          "Description": "The Godfather is a 1972 American epic gangster film directed by Francis Ford Coppola, who co-wrote the screenplay with Mario Puzo, based on Puzo's best-selling 1969 novel of the same title. The film stars an ensemble cast including Marlon Brando, Al Pacino, James Caan, Richard Castellano, Robert Duvall, Sterling Hayden, John Marley, Richard Conte, and Diane Keaton. I",
          "Genre": {
            "Name": "Gangster Film",
            "Description": "A gangster film or gangster movie is a film belonging to a genre that focuses on gangs and organized crime. "
          },
          "Director": {
            "Name": "Francis Ford Coppola",
            "Bio": "Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the leading figures of the New Hollywood film movement and is widely considered one of the greatest directors of all time.[a] Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d'Or, and a BAFTA Award.",
            "Birth": "April 7, 1939",
          },  
          "ImageURL": "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
          "Featured": false
        },
        
        {
          "Title": "Pulp Fiction", 
          "Description": "Pulp Fiction is a 1994 American independent crime film written and directed by Quentin Tarantino from a story he conceived with Roger Avary.[3] It tells four intertwining tales of crime and violence in Los Angeles, California. The film stars John Travolta, Samuel L. Jackson, Bruce Willis, Tim Roth, Ving Rhames, and Uma Thurman. The title refers to the pulp magazines and hardboiled crime novels popular during the mid-20th century, known for their graphic violence and punchy dialogue.",
          "Genre": {
            "Name": "Crime Film",
            "Description": "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. "
          },
          "Director": {
            "Name": "Quentin Tarantino",
            "Bio": "Quentin Jerome Tarantino is an American filmmaker and actor. His films are characterized by stylized violence, extended dialogue often with profanity, and references to popular culture. Tarantino's work has been subject to criticism, such as the depictions of violence and frequent inclusion of racial slurs. During Tarantino's career, his films have garnered a cult following, as well as critical and commercial success; he has been considered 'the single most influential director of his generation'. He is the recipient of two Academy Awards, two BAFTA Awards, and four Golden Globe Awards.",
            "Birth": "March 27, 1963",
          },  
          "ImageURL": "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
          "Featured": false
        },  
    ];


// CREATE
// Create a user 
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }

})

// Add a moive to a user's list of favorites in Mongoose 
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send( 'Error: ' + err);
  });
});

// Create favorite movies
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
  } else {
      res.status(400).send('no such user')
  }
});

// READ

app.get('/', (req, res) => {
  res.send('Welcome to myFlix! Add /movies to the URL to see more info.');
});

// Get a User by name
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get all users
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ Movies
app.get('/movies', async (req, res) => {
  await Moives.find()
  .then((movies) => {
    res.status(200).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// READ Title
app.get('/movies/:title', async (req, res) => {
  const title  = req.params.title;
  const movie = await movies.findOne({ Title: title });

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('No such movie');
  }
});

// READ Genre
app.get('/movies/genre/:genreName', async (req, res) => {
  const genreName = req.params.genreName;
  const movie = await Movies.findOne({ 'Genre.Name': genreName});

  if (movie) {
    res.status(200).json(movie.Genre);
  } else {
    res.status(400).send('No such genre');
  }
});

// READ Director Name
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;

  Movies.findOne({ 'Director.Name': directorName })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie.Director);
      } else {
        res.status(404).send('No such director');
      }
    })
    .catch((err) => {
      res.status(500).send('Error: ' + err);
    });
});

// Test connection

app.get('/', (req, res) => {
  res.send('Welcome to myFlix! Add /movies to the URL to see more info.');
});

// UPDATE 

// Update user's favorite movies in Mongoose
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) 
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send( 'Error:' + err);
  });
});

// Update username for a user in Mongoose
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error' + err);
  })

});


// Delete a user by username
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Delete favorite movie
app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  )
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found');
    } else {
      res.status(200).send('Movie was removed from ' + req.params.Username + '\'s favorite movies.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

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