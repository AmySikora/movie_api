const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Movie schema defines the structure for movie documents in MongoDB
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true }, 
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

// User schema defines the structure for user documents in MongoDB
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // Correct ref to 'Movie'
});

// Hashing the password before saving
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// Validates the password during login
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
