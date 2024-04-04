const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    // maybe make an admin role, just a passing note
    enum: ['adopter', 'adoptee'],
  },
});

module.exports = mongoose.model('User', UserSchema);
