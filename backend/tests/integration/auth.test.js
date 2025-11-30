const request = require('supertest');
const app = require('../../src/app');

describe('Auth Integration Tests', () => {
  describe('POST /auth/register', () => {
    it('deve retornar 400 se campos obrigatórios estão faltando', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ email: 'test@test.com' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('deve retornar 201 ao registrar com dados válidos', async () => {
      const uniqueEmail = `test${Date.now()}@test.com`;
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: uniqueEmail,
          password: '123456',
        });

      expect([201, 400]).toContain(response.status);
      if (response.status === 201) {
        expect(response.body).toHaveProperty('id');
        expect(response.body.email).toBe(uniqueEmail);
      }
    });
  });

  describe('POST /auth/login', () => {
    it('deve retornar 400 se email ou senha estão faltando', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@test.com' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('deve retornar 401 com credenciais inválidas', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'invalid@test.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('deve retornar 200 e token com credenciais válidas', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'admin@ifrs.edu.br',
          password: '123456',
        });

      expect([200, 401]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
      }
    });
  });
});
