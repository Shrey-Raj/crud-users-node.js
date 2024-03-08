# Backend README

This is the backend part of the project, responsible for handling CRUD operations for user data using Node.js, Express.js, and MongoDB.

## Project Structure

- /controllers
    - userController.js

- /models
    - userModel.js
- index.js

### Breakdown

- **controllers:** Contains the logic for handling different CRUD operations.
- **models:** Defines the MongoDB schema for the User model.
- **index.js:** Sets up the Express.js server and connects to MongoDB.

## Installation

1. Clone the repository:

    - git clone https://github.com/Shrey-Raj/crud-users-node.js.git


2. Navigate to the `crud-users-node.js` directory: 

    `cd crud-users-node.js`


3. Install dependencies: 
        `npm install`



## Configuration

1. Set up a MongoDB database and obtain the connection string.

2. Open `crud-users-node.js/server.js` and replace `'MONGO_URI'` with your actual MongoDB connection string.

## Running the Server


The server will run on `http://localhost:3001` by default.

## API Endpoints

- **GET /api/getUsers:** Get all users.
- **GET /api/getUsers/:id:** Get a user by ID.
- **POST /api/getUsers:** Create a new user.
- **PUT /api/getUsers/:id:** Update a user by ID.
- **DELETE /api/getUsers/:id:** Delete a user by ID.
- **POST /api/sendemail** Send data of users as an email 
