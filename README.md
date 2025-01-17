# myFlix API

## Overview
The **myFlix API** is the backend component of the **myFlix** web application, designed for movie enthusiasts. This RESTful API provides access to a database of movies, directors, and genres, allowing users to manage their personal profiles and favorite movie lists.

---

## 🌟 Features
### Movies
- Retrieve a list of ALL movies.
- Get detailed information about a single movie, including description, genre, director, image URL, and featured status.
- Get genre details by name (e.g., "Thriller").
- Get director details, including bio, birth year, and death year.

### Users
- Register new users with a username, password, email, and date of birth.
- Update user information (username, password, email, and date of birth).
- Add movies to a user’s favorite list.
- Remove movies from a user’s favorite list.
- Deregister (delete) a user account.

---

## 📖 User Stories
- **As a user**, I want to receive information about movies, directors, and genres so I can learn more about movies I’ve watched or am interested in.
- **As a user**, I want to create a profile to save data about my favorite movies.

---

## 🛠️ Technical Details
- **Architecture**: RESTful API
- **Frameworks**: Node.js, Express.js
- **Database**: MongoDB with Mongoose modeling
- **Middleware**: Includes `body-parser`, `morgan`, `cors`, and others
- **Data Format**: JSON
- **Authentication**: Secure endpoints with Passport.js and JWT (JSON Web Tokens)
- **Validation**: User input validation with `express-validator`
- **Error Handling**: Comprehensive error responses for robust API usage
- **Testing**: Tested with Postman
- **Deployment**: Hosted on Heroku, source code on GitHub

---

## 🚀 Installation

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

---

## 🌐 API Endpoints

### Movie Endpoints
- **GET /movies**: Retrieve a list of all movies.
- **GET /movies/:title**: Get details about a single movie by title.
- **GET /genres/:name**: Get details about a genre by name.
- **GET /directors/:name**: Get details about a director by name.

### User Endpoints
- **POST /users**: Register a new user.
- **PUT /users/:username**: Update user information.
- **POST /users/:username/movies/:movieId**: Add a movie to a user's favorite list.
- **DELETE /users/:username/movies/:movieId**: Remove a movie from a user's favorite list.
- **DELETE /users/:username**: Deregister a user.

---

## 🔧 Design Criteria
This project adheres to the following technical and design standards:
- **Middleware**: Use at least three middleware modules, including logging and data parsing.
- **Security**: Implement authentication, authorization, and secure data storage.
- **Testing**: Ensure all endpoints are tested using tools like Postman.
- **Deployment**: Deploy API to Heroku for public access.

---

## ✨ Acknowledgements
This project is part of the Achievement 2 milestone in the Full-Stack JavaScript development program. The next step will be building the client-side of **myFlix** using React, completing the full-stack MERN application.

---

## 📄 License
This project is licensed under the MIT License.

---

## 📬 Contact
For questions or feedback, feel free to reach out:
- **GitHub**: [amysikora](https://github.com/amysikora)

