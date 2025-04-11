// __tests__/grade.service.test.ts
import request from 'supertest';
import { app } from '../src/index';

let professorToken = '';

beforeAll(async () => {
  const res = await request(app).post('/auth/login').send({
    email: 'prof@example.com',
    password: 'password123'
  });
  professorToken = res.body.token;
});

describe('Grade Service', () => {
  it('should allow a professor to create a grade', async () => {
    const res = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${professorToken}`)
      .send({
        query: `
          mutation {
            createGrade(input: {
              studentId: "123",
              course: "Math",
              score: 88
            }) {
              id
              score
            }
          }
        `
      });

    expect(res.body.data.createGrade.score).toBe(88);
  });
});