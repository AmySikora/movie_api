import express, { json, urlencoded } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { Movie, User } from "./models.js";
import { authenticate } from "passport";
import { check, validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import cors from "cors";

// MongoDB Connection
mongoose
  .connect(process.env.CONNECTION_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const app = express();
const Movies = Movie;
const Users = User;

// Middleware configuration
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(express.static("public"));

// CORS Configuration
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:4200",
  "http://localhost:1234",
  "https://myflixmovies123-d3669f5b95da.herokuapp.com",
  "https://myflix-app-123.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from origin ${origin}`), false);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Passport and Auth Configuration
import "./passport";
require("./auth")(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const responseMessage = process.env.NODE_ENV === 'production' 
    ? "Internal Server Error" 
    : err.message;
  res.status(500).send(responseMessage);
});

// Routes
app.get("/", (req, res) => res.send("Welcome to myFlix!"));

// User Registration
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check("Username", "Username contains non-alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      console.log("Registering user:", req.body.Username);
      const hashedPassword = Users.hashPassword(req.body.Password);
      const userExists = await Users.findOne({ Username: req.body.Username });
      if (userExists) return res.status(400).send("User already exists.");

      const newUser = await Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An unexpected error occurred. Please try again.");
    }
  }
);

// Login Route
app.post("/login", authenticate("local", { session: false }), (req, res) => {
  const token = sign(
    { Username: req.user.Username, _id: req.user._id },
    process.env.JWT_SECRET || "your_jwt_secret",
    { subject: req.user.Username, expiresIn: "7d", algorithm: "HS256" }
  );
  return res.json({ user: req.user, token: token });
});

// Add a movie to user's favorites
app.post(
  "/users/:Username/movies/:MovieID",
  authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $push: { FavoriteMovies: req.params.MovieID } },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send("Error: " + err);
    }
  }
);

// Remove a movie from user's favorites
app.delete(
  "/users/:Username/movies/:MovieID",
  authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $pull: { FavoriteMovies: req.params.MovieID } },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send("Error: " + err);
    }
  }
);

// Get all movies
app.get("/movies", authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// Get user route
app.get('/users', async (req, res) => {
  try {
    const users = await Users.find(); 
    res.status(200).json(users); 
  } catch (error) {
    res.status(500).send('Error: ' + error); 
  }
});


// Update user information
app.put(
  "/users/:Username",
  authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
          $set: {
            Username: req.body.Username,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
            Password: req.body.Password ? Users.hashPassword(req.body.Password) : undefined,
          },
        },
        { new: true, omitUndefined: true }
      );

      if (!updatedUser) {
        return res.status(404).send("User not found");
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user info:", error);
      res.status(500).send("Error updating profile: " + error);
    }
  }
);

// Delete a user by username
app.delete(
  "/users/:Username",
  authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findOneAndDelete({ Username: req.params.Username });
      if (!user) {
        return res.status(404).send(`${req.params.Username} was not found`);
      }
      res.status(200).send(`${req.params.Username} was deleted.`);
    } catch (err) {
      res.status(500).send("Error: " + err);
    }
  }
);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on Port ${port}`);
});
