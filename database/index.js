const mongoose = require('mongoose')
const User = require('./schemas/User')
const Pet = require('./schemas/Pet')
const Message = require('./schemas/Messages')

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/STSWENG')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

//user_populate() //works
//pet_populate() //works
//populateMessages();

//populate user mongodb test
async function user_populate(){
    try{
        User.insertMany([ 
            {username:"Test", password:"12345", email:"a@a.com", role:"adopter"},
            {username:"Test2", password:"123456", email:"b@b.com", role:"adoptee"}
        ])
    } catch(e){
        console.log(e.message)
    }
}

//burn user
async function users_delete(){
    try{
        User.deleteMany({})
        .then((result) => {
        console.log(`Refreshed ${result.deletedCount} users`);
      })
        .catch((error) => {
        console.error("Error deleting users:", error);
      })
    } catch(e){
        console.log(e.message)
    }
}

async function pet_populate(){
    try {//name], species], breed], size], age], bnc, background, kennel_owner] //img later
        Pet.insertMany([
            {name:"Gabby", species:"Dog", breed:"Any", size:"Toy" ,age:"1 year old", bnc:"", background:"", kennel_owner:"NotARealPerson"},
            {name:"Dante", species:"Bird", breed:"Parrot", size:"Medium", age:"2 years old", bnc:"Lorem Ipsum", background:"Lorem Ipsum", kennel_owner:"Gabbygoodl"},
            {name:"Meow", species:"Cat", breed:"Siamese", size:"Extra Large", age:"15 years old", bnc:"Bruh", background:"Hurb", kennel_owner:"Tony"}
        ])
    } catch (error) {
        console.log(e.message)
    }
}

async function populateMessages() {
    try {
        // Find the users with usernames 'a' and 'b'
        const sender = await User.findOne({ username: 'a' });
        const receiver = await User.findOne({ username: 'aab' });

        if (!sender || !receiver) {
            console.log("Sender or receiver not found.");
            return;
        }

        // Create some messages
        const messages = [
            { sender: sender._id, receiver: receiver._id, content: "Hello!", timestamp: new Date() },
            { sender: receiver._id, receiver: sender._id, content: "Hi there!", timestamp: new Date() },
            // Add more messages as needed
        ];

        // Insert messages into the database
        await Message.insertMany(messages);

        console.log("Messages populated successfully.");
    } catch (error) {
        console.error("Error populating messages:", error);
    }
}