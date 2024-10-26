# MyFlix API Documentation

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Get All Users](#get-all-users)
  - [Create New User](#create-new-user)
  - [Update User](#update-user)
  - [Add Favorite Movie to User](#add-favorite-movie-to-user)
  - [Remove Favorite Movie from User](#remove-favorite-movie-from-user)
  - [Delete User](#delete-user)
  - [Get All Movies](#get-all-movies)
  - [Get Movie by Title](#get-movie-by-title)
  - [Get Movies by Genre](#get-movies-by-genre)
  - [Get Movies by Director](#get-movies-by-director)
- [Error Handling](#error-handling)
- [Authentication](#authentication)
- [Login](#login)
- [License](#license)

### Overview

MyFlix is a movie app built with Node.js and Express that provides information about various movies through API endpoints. Users can sign up, log in, add movies to their favorites, and access detailed information about each movie.

Once the server is running, you can access the app in your browser at `http://localhost:8080`.

### Installation

1. Clone the repository:
   ```bash
   git clone [myFlix-client](https://github.com/AmySikora/myFlix-client)

Prerequisites
Node.js
MongoDB Atlas account or a local MongoDB instance
Heroku, Render, or Netlify account for hosting
API Endpoints
Get All Users
URL: /users
Method: GET
Description: Retrieve a list of all users.
Create New User
URL: /users
Method: POST
Description: Create a new user with fields for Username, Password, Email, and optional Birthday.
Update User
URL: /users/:username
Method: PUT
Description: Update user details.
Request Params:
username (string): Username of the user to update.
Add Favorite Movie to User
URL: /users/:username/movies/:movieId
Method: POST
Description: Add a movie to a user's list of favorites.
Request Params:
username (string): User's username.
movieId (string): ID of the movie to add.
Remove Favorite Movie from User
URL: /users/:username/movies/:movieId
Method: DELETE
Description: Remove a favorite movie from a user's list.
Delete User
URL: /users/:username
Method: DELETE
Description: Delete a user by username.
Get All Movies
URL: /movies
Method: GET
Description: Retrieve a list of all movies.
Get Movie by Title
URL: /movies/:title
Method: GET
Description: Retrieve a movie by its title.
Get Movies by Genre
URL: /movies/genre/:genreName
Method: GET
Description: Retrieve movies by genre name.
Get Movies by Director
URL: /movies/director/:directorName
Method: GET
Description: Retrieve movies and details of the director by director name.
Error Handling
Errors are handled by a centralized middleware function that captures errors and sends a JSON response with an appropriate status code and message.

Authentication
This API uses JWT (JSON Web Token) for authentication. To access protected routes, you need to include a valid JWT token in the Authorization header of your requests. The app also implements CORS and password hashing for security.

Login
To log in and receive a JWT token:

URL: /login
Method: POST
Request body: { "Username": "yourUsername", "Password": "yourPassword" }
Hosting
The MyFlix API is hosted on Heroku and Netlify:

API Base URL: https://myflixmovies123-d3669f5b95da.herokuapp.com
Client URL: https://myflix-app-123.netlify.app
Contributing
If you’d like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

License
This project is licensed under the MIT License - see the LICENSE file for details.
