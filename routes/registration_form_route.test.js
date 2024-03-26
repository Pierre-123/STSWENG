const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {connect, closeDatabase, clearDatabase} = require('../test/TestDB');
const User = require('../database/schemas/User');
const registrationRouter = require('../routes/registration_form_route');
// Assuming this is your initial selection route
const initialSelectionRouter = require('../routes/registration_route');

// Mock mongoose model for User
jest.mock('../database/schemas/User');

// Setup a test Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); // Assuming you are using EJS
app.use('/register', registrationRouter);
// Setup route for initial role selection
app.use('/initial-selection', initialSelectionRouter);

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('Initial Role Selection Page', () => {
  it('should load the initial role selection page', async () => {
    const response = await request(app).get('/registration_route');
    expect(response.statusCode).toBe(200);
    // Checking for content specific to the initial role selection page
    expect(response.text).toContain('I am...');
  });

  it('should accept role selection and direct to the registration form',
      async () => {
        const roleSelection = await request(app)
        // Simulating selection and redirection
            .get('/register?role=adopter');

        expect(roleSelection.statusCode).toBe(200);
        expect(roleSelection.text).toContain('Registration Form');
        // Ensure the role is correctly passed to the form
        expect(roleSelection.text).toContain('adopter');
      });
});

describe('Registration Form Submission', () => {
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

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/login');
  });
  // Additional tests can be added as needed
});
