# MyFlix Backend API

Welcome to the **myFlix Backend API**, the server-side of a movie app where you can explore a variety of movies, manage your user profile, and maintain a favorite movie lists. This API is designed to be simple, efficient, and secure.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Acknowledgment of AI Usage](#acknowledgment-of-ai-usage)
- [License](#license)

## About the Project

The **myFlix Backend API** is a RESTful API built to provide movie enthusiasts with access to movie details, directors, and genres. Users can sign up, update their profiles, and create personalized lists of favorite movies. This project focuses on practical backend development skills and serves as a foundation for the frontend client.

## Features

### Movies

- Retrieve a full list of movies.
- Fetch detailed information about a specific movie by its title.
- Access genre information, including a list of movies within that genre.
- Get details about directors, such as their biography and notable works.

### Users

- User registration with secure password storage.
- Login functionality with JWT-based authentication.
- Update user profiles, including username, email, and date of birth.
- Add or remove movies from a list of favorites.
- Delete user accounts.

## Technologies

- **Express.js**: Framework for building the server.
- **MongoDB**: Database to store user and movie data.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.
- **Passport.js**: Middleware for user authentication.
- **JWT (JSON Web Tokens)**: Secure token-based user sessions.
- **Bcrypt**: Password hashing for secure storage.
- **CORS**: Middleware for handling cross-origin requests.

## Getting Started

### Prerequisites

- Node.js installed (v14 or higher recommended).
- A MongoDB database (local or hosted, e.g., MongoDB Atlas).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie_api.git
   cd movie_api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root with the following variables:
   ```env
   CONNECTION_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Access the API at `http://localhost:8080`.

## API Endpoints

### Movies Endpoints

- **GET /movies**: Fetch all movies.
- **GET /movies/:title**: Get details of a specific movie by title.
- **GET /genres/:name**: Fetch details about a genre and its movies.
- **GET /directors/:name**: Get information about a director.

### User Endpoints

- **POST /users**: Register a new user.
- **PUT /users/:username**: Update a user's profile information.
- **DELETE /users/:username**: Delete a user account.
- **POST /users/:username/movies/:movieId**: Add a movie to a user's favorite list.
- **DELETE /users/:username/movies/:movieId**: Remove a movie from a user's favorite list.

## Usage

Once the server is running, you can test the API using tools like [Postman](https://www.postman.com/) or cURL. For example, to fetch all movies:

```bash
GET http://localhost:8080/movies
```

## Acknowledgment of AI Usage

Some of this project, such as the the documentation, was generated or enhanced using AI tools to ensure clarity and completeness. This acknowledgment aligns with transparency and ethical usage of AI in development projects.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
