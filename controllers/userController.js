require("dotenv").config();
const User = require("../models/userModel");
const nodemailer = require('nodemailer'); 

function routeControllers() {
  return {

    async homePage(req,res){
        try {
        res.status(200).json({message : "Welcome to the backend server !"}); 
        } catch (error) {
            console.log(error);
            res.status(500).json({message : error.message}); 
        }
    },

    async getAllUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    },

    async getUserById(req, res) {
      try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },

    async createUser(req, res) {
      try {
        // Assuming req.body contains user data
        const userData = req.body;
        const newUser = await User.create(userData);

        res.status(201).json(newUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },

    async updateUser(req, res) {
      try {
        const userId = req.params.id;
        const userData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
          new: true,
        });

        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },

    async deleteUser(req, res) {
      try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(204).end();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },

    async processUserIdsAndSendEmail(req,res) {
      try {

        const userIds = req.body ; 
        console.log(userIds); 
        const users = await User.find({ _id: { $in: userIds } });
    
        // console.log("send mail to them : " , users) ; 
  
        const transporter = nodemailer.createTransport({
          service: 'gmail',  
          auth: {
            user: process.env.MYMAIL,
            pass: process.env.APP_PASS,
          },
        });
    
          const mailOptions = {
            from: process.env.MYMAIL,
            to: 'info@redpositive.in',
            subject: 'User Information',
            text: `User Information: ${JSON.stringify(users, null, 2)}`,
          };
    
          await transporter.sendMail(mailOptions);
        
        console.log('All emails sent successfully');
        res.status(200).json({message: "Mails sent successfully"}); 
      } catch (error) {
        console.error('Error processing user IDs and sending emails:', error);
        res.status(500).json({message: `Error in sending mails , ${error}`}); 
      }
    }
    

  };
}

module.exports = routeControllers;
