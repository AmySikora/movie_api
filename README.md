# Movie API

Welcome to the **Movie API**! This API allows users to manage movie data, register and authenticate users, and perform various actions related to user accounts and favorite movies. Below, you'll find a comprehensive guide to using the API.

---

## Features
- User registration and authentication with JWT.
- CRUD operations for user accounts.
- Manage user favorite movies.
- Retrieve details about movies, including genres and directors.
- Built with Express.js and MongoDB.

---

## Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (Node Package Manager)
- MongoDB database (e.g., MongoDB Atlas)

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
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
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

## API Documentation
The API documentation is auto-generated using **JSDoc**. To view the documentation:

1. Install JSDoc globally (if not already installed):
   ```bash
   npm install -g jsdoc
   ```
2. Generate the documentation:
   ```bash
   jsdoc index.js
   ```
3. Open the `out/index.html` file in a web browser to explore the API details.

---

## Endpoints

### **User Endpoints**
#### `POST /users`
- **Description**: Register a new user.
- **Example Request Body**:
  ```json
  {
    "Username": "jane_doe",
    "Password": "Password123!",
    "Email": "jane.doe@example.com",
    "Birthday": "1995-10-25"
  }
  ```

#### `POST /login`
- **Description**: Authenticate a user and return a JWT token.
- **Example Request Body**:
  ```json
  {
    "Username": "jane_doe",
    "Password": "Password123!"
  }
  ```

#### `PUT /users/:Username`
- **Description**: Update user account information.

#### `DELETE /users/:Username`
- **Description**: Delete a user account.

---

### **Movie Endpoints**
#### `GET /movies`
- **Description**: Retrieve a list of all movies.

#### `POST /users/:Username/movies/:MovieID`
- **Description**: Add a movie to a user's favorite movies list.

#### `DELETE /users/:Username/movies/:MovieID`
- **Description**: Remove a movie from a user's favorite movies list.

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Passport.js, JWT
- **Documentation**: JSDoc

---

## Acknowledgements
- API documentation generated with **JSDoc**.
- Inspired by coursework and personal projects.

---

## License
This project is licensed under the MIT License.

---

## Contact
For questions or feedback, feel free to reach out:
- GitHub: [amysikora](https://github.com/amysikora)


