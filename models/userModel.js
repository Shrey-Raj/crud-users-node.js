const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  hobbies: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
