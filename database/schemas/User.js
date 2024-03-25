const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique
    // Validates the email format
    validate: [validator.isEmail, 'Invalid email'],
  },
  role: {
    type: String,
    required: true,
    // Allows for an 'admin' role, alongside 'adopter' and 'kennel'
    enum: ['adopter', 'kennel', 'admin'],
  },
}, {timestamps: true}); // Adds createdAt and updatedAt timestamps

// Hashes the password before saving it to the database
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
