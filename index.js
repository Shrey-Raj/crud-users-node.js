require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require('nodemailer');
const userController = require('./controllers/userController'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
app.use(express.json());

//CRUD Routes
app.get('/' , userController().homePage) ; 
app.get('/users', userController().getAllUsers);
app.get('/users/:id', userController().getUserById);
app.post('/users', userController().createUser);
app.put('/users/:id', userController().updateUser);
app.delete('/users/:id', userController().deleteUser);
app.post('/sendemail', userController().processUserIdsAndSendEmail);


// MongoDB connection
mongoose.set("strictQuery", false);
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI); // db connection string
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


// Start the server
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`server running at http:localhost:${PORT}`);
    });
  });
