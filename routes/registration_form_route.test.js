const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
// Adjust the path as necessary
const User = require('../database/schemas/User');
// Adjust the path as necessary
const registrationRouter = require('../routes/registration');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Setup a test Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); // Assuming you are using EJS
app.use('/register', registrationRouter);

// Mock mongoose model for User
jest.mock('../database/schemas/User');

beforeAll(async () => {
  // Connect to a Mongo DB
});

afterAll(async () => {
  // Disconnect from the Mongo DB
  await mongoose.connection.close();
});

describe('Registration Route', () => {
  it('should reject registration with invalid email format', async () => {
    const userData = {
      username: 'testuser',
      email: 'notanemail',
      password: 'password123',
      passwordConfirm: 'password123',
      role: 'adopter',
    };

    const response = await request(app)
        .post('/register')
        .send(userData);

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Invalid email format');
  });

  it('should allow user registration with valid data', async () => {
    const userData = {
      username: 'validuser',
      email: 'valid@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
      role: 'adopter',
    };

    // Mock the User.findOne to simulate no existing user
    User.findOne.mockResolvedValue(null);
    // Mock bcrypt hash for password hashing
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: 'newUserId',
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
      }),
    }));

    const response = await request(app)
        .post('/register')
        .send(userData);

    /*
     Assuming you redirect users to a
     login page or similar on successful registration
    */
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  // Can use more test
});
