// Require necessary packages
require("dotenv").config();
const express = require("express"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  passport = require("passport"),
  { check, validationResult } = require("express-validator"),
  jwt = require("jsonwebtoken"),
  cors = require("cors");

const app = express();
const Movies = Models.Movie;
const Users = Models.User;

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(express.static("public"));

// CORS configuration
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:1234",
  "https://myflixmovies123-d3669f5b95da.herokuapp.com",
  "https://myFlix-app-123.netlify.app",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      let message = `CORS policy does not allow access from origin ${origin}`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Passport and Auth Configuration
require("./passport"); // Configure passport strategies
require("./auth")(app); // Attach login route with passport

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Routes

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

// User registration route
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check("Username", "Username contains non-alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) return res.status(400).send(`${req.body.Username} already exists`);
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => res.status(201).json(user))
          .catch((error) => res.status(500).send("Error: " + error));
      })
      .catch((error) => res.status(500).send("Error: " + error));
  }
);

// Login route using passport-local authentication
app.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  const token = jwt.sign(
    { Username: req.user.Username, _id: req.user._id },
    process.env.JWT_SECRET || "your_jwt_secret",
    { subject: req.user.Username, expiresIn: "7d", algorithm: "HS256" }
  );
  return res.json({ user: req.user, token: token });
});

// Add a movie to user's favorites
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.status(500).send("Error: " + err));
  }
);

// Remove a movie from user's favorites
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.status(500).send("Error: " + err));
  }
);

// Get all movies
app.get("/movies", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await Movies.find()
    .then((movies) => res.status(201).json(movies))
    .catch((err) => res.status(500).send("Error: " + err));
});

// Additional routes as in your existing code...

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on Port ${port}`);
});
