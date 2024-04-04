const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  behaviorsAndCharacteristics: { // Behaviors and Characteristics
    type: String,
  },
  shelter: { // Username of Kennel
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Pet', PetSchema);
