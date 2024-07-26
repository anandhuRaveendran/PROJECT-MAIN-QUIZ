const { Schema } = require('mongoose');
const { model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String } // Add this line
});

const users = model('users', userSchema);

module.exports = users;
