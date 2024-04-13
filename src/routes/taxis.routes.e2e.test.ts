import request from 'superagent';

describe('GET /api/taxis', () => {
  it('should respond with status 200', async () => {
    const response = await request.get('http://localhost:3000/api/taxis');
    expect(response.status).toBe(200);
  });
});
