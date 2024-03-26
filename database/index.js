const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./schemas/User');

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/STSWENG', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

/**
 * Populates test users with hashed passwords.
 */
async function userPopulate() {
  const users = [
    {username: 'Test', password: '12345', email: 'a@a.com', role: 'adopter'},
    {username: 'Test2', password: '123456', email: 'b@b.com',
      role: 'kennel'}, // Corrected role
  ];

  try {
    // Hash passwords before inserting
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    await User.insertMany(users);
    console.log('Test users populated');
  } catch (e) {
    console.error('Error populating users:', e.message);
  }
}

/**
 * Deletes all users.
 */
async function usersDelete() {
  try {
    const result = await User.deleteMany({});
    console.log(`Refreshed ${result.deletedCount} users`);
  } catch (e) {
    console.error('Error deleting users:', e.message);
  }
}

// Example calls (uncomment as needed)
// userPopulate();
// usersDelete();
