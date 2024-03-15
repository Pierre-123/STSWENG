const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    bnc: { //Behaviors and Characteristics
        type: String
    },
    background: {
        type: String
    },
    kennel_owner: { //Username of Kennel
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Pet', PetSchema)