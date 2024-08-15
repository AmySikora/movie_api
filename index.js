// Require express, Morgan, body-parser, and uuid
const express = require('express'),
  morgan = require('morgan');
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

// Morgan used to log requests 
app.use(morgan('combined'));

// Body-Parser
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

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

// Create users
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

// Update User 
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  
  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user); 
  } else {
    res.status(400).send('no such user') 
  }
})


// READ movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
})

// READ title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('No such movie');
  }
})

// READ Genre
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('No such genre');
  }
})
// READ Director Name
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('No such director');
  }
})
app.get('/', (req, res) => {
  res.send('Welcome to myFlix! Add /movies to the URL to see more info.');
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