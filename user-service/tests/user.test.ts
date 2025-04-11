// tests/user.test.ts
import request from 'supertest';
import mongoose from 'mongoose';
import User from '../src/models/User';
import dotenv from 'dotenv';
import { startServer, stopServer } from '../src/index';

dotenv.config({ path: '.env.local' });

jest.setTimeout(20000); 

let server: any;

beforeAll(async () => {
  server = await startServer(4002);
});

afterAll(async () => {
  await User.deleteMany({});
  await stopServer();
});

describe('User Service - Auth flow', () => {
  const userData = {
    email: 'test@example.com',
    password: 'password123',
    pseudo: 'testUser'
  };

  let token: string;

  it('should register a new user', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: `
          mutation {
            registerUser(input: {
              email: "${userData.email}",
              password: "${userData.password}",
              pseudo: "${userData.pseudo}"
            }) {
              id
              email
            }
          }
        `
      });

    console.log('GraphQL response:', res.body);
    expect(res.body.data.registerUser.email).toBe(userData.email);
  });

  it('should login and return a token', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: `
          mutation {
            loginUser(email: "${userData.email}", password: "${userData.password}") {
              token
            }
          }
        `
      });

    console.log('Login response:', res.body);
    expect(res.body.data.loginUser.token).toBeDefined();
    token = res.body.data.loginUser.token;
  });

  it('should deny deleting another user', async () => {
    const res = await request(server)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
          mutation {
            deleteUser(id: "123456789012")
          }
        `
      });

    expect(res.body.errors).toBeDefined();
  });
});
