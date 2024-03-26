// const request = require('supertest');
// const bcrypt = require('bcrypt');
// const express = require('express');
// // Adjust the path as necessary
// const User = require('../database/schemas/User');
// const loginRouter =
//   require('../routes/login_route'); // Adjust the path as necessary

// // Mock express app
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use('/login', loginRouter);

// // Mock User schema methods for the test
// jest.mock('../database/schemas/User', () => ({
//   findOne: jest.fn(),
// }));

// describe('Login Route', () => {
//   it('should allow a user to login with correct credentials', async () => {
//     const mockUser = {
//       _id: 'someUserId',
//       username: 'testUser',
//       password: await bcrypt.hash('password123', 10),
//     };
//     User.findOne.mockResolvedValue(mockUser);

//     const response = await request(app)
//         .post('/login')
//         .send({username: 'testUser', password: 'password123'});

//     // Assuming a redirect happens upon successful login
//     expect(response.status).toBe(302);
//     expect(response.headers.location).toBe('/petSearch.html');
//   });

//   it('should reject login with incorrect password', async () => {
//     const mockUser = {
//       _id: 'someUserId',
//       username: 'testUser',
//       password: await bcrypt.hash('password123', 10),
//     };
//     User.findOne.mockResolvedValue(mockUser);

//     const response = await request(app)
//         .post('/login')
//         .send({username: 'testUser', password: 'wrongPassword'});

//     // Assuming it renders the login page again with an error
//     expect(response.status).toBe(200);
//     // Check if the response body contains this error message
//     expect(response.text).toContain('Invalid username/password');
//   });
// });
