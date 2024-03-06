const User = require("../models/userModel");

function routeControllers() {
  return {
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
  };
}

module.exports = routeControllers;
