import { app } from '../index';
import request from 'supertest';

describe('GET /api/taxis', () => {
  it('Without parameters should respond with status 200', async () => {
    const response = await request(app).get('/api/taxis');
    expect(response.status).toBe(200);
  });

  it('Send a string in page parameter should respond with status 404', async () => {
    const response = await request(app).get('/api/taxis?page=helloWorld');
    expect(response.status).toBe(404);
  });

  it('Should get the page that you are asking for', async () => {
    const page = 3;
    const response = await request(app).get('/api/taxis?page=' + page);
    expect(response.body.currentPage).toBe(page);
  });
});
