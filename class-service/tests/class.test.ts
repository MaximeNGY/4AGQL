import request from 'supertest';
import { app, server } from '../src/index'; // Assure-toi que index.ts exporte app et server
import mongoose from 'mongoose';

describe('GraphQL - ClassService', () => {
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('should create a new class', async () => {
    const mutation = `
      mutation {
        createClass(name: "Math 101", description: "Basic Math", professor: "prof1") {
          id
          name
          description
          professor
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createClass.name).toBe('Math 101');
  });

  it('should fetch all classes', async () => {
    const query = `
      query {
        getClasses {
          id
          name
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query });

    expect(response.status).toBe(200);
    expect(response.body.data.getClasses.length).toBeGreaterThan(0);
  });
});
