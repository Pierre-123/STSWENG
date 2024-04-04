const mongoose = require('mongoose');
const User = require('./schemas/User');

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/STSWENG')
    .then(async () => {
        console.log('Connected to MongoDB');
        // Populate users
        await userPopulate();
    })
    .catch((err) => console.error('Could not connect to MongoDB', err));

/**
 * Populates test users
 */
async function userPopulate() {
    try {
        await User.insertMany([
            { username: 'Test', password: '12345', email: 'a@a.com', role: 'adopter' },
            { username: 'Test2', password: '123456', email: 'b@b.com', role: 'adoptee' },
        ]);
        console.log('Test users populated successfully.');
    } catch (e) {
        console.log('Error populating test users:', e.message);
    }
}

/**
 * Deletes users
 */
async function usersDelete() {
    try {
        await User.deleteMany({});
        console.log('All users deleted successfully.');
    } catch (e) {
        console.error('Error deleting users:', e);
    }
}
