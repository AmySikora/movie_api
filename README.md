# MyFlix DB

A movie API system providing movie and user management with features like authentication and data validation.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Features

- **Movies API**: Access movie details.
- **User Management**: Manage users and their favorite movies.
- **Authentication**: JWT-based security.
- **Data Validation**: Ensures data integrity.

## Technologies

- **Express.js**: Node.js web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB ODM.
- **Passport.js**: Authentication middleware.
- **Cors**: Cross-Origin Resource Sharing middleware.
- **Bcrypt**: Password hashing.

## Setup

### Prerequisites
- Node.js and npm installed
- MongoDB database setup (e.g., MongoDB Atlas)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie_api.git
   cd movie_api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following variables:
   ```env
   CONNECTION_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Access the API at `http://localhost:8080` (default port).

## API Endpoints

### Movies
- **GET /movies**: Retrieve a list of all movies.
- **GET /movies/:title**: Get details about a movie by title.
- **GET /genres/:name**: Get movies by genre.
- **GET /directors/:name**: Get a director by name.

### Users
- **GET /users**: Get all users.
- **POST /users**: Create a user.
- **PUT /users/:username**: Update a user.
- **DELETE /users/:username**: Delete a user.
- **POST /users/:username/movies/:MovieID**: Add a movie to favorites.
- **DELETE /users/:username/movies/:MovieID**: Remove a movie from favorites.

## Usage

Explore the API at `http://localhost:8080/docs` once the server is running.

## License

MIT License - see the LICENSE file for details.

