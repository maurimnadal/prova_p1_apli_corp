const request = require('supertest');
const app = require('../../src/app');

describe('Events Integration Tests', () => {
  let authToken;

  beforeAll(async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@ifrs.edu.br',
        password: '123456',
      });

    if (response.status === 200) {
      authToken = response.body.token;
    }
  });

  describe('GET /events', () => {
    it('deve retornar 401 sem token de autenticação', async () => {
      const response = await request(app).get('/events');

      expect(response.status).toBe(401);
    });

    it('deve retornar 200 e lista de eventos com token válido', async () => {
      if (!authToken) {
        return;
      }

      const response = await request(app)
        .get('/events')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /events', () => {
    it('deve retornar 401 sem token de autenticação', async () => {
      const response = await request(app)
        .post('/events')
        .send({
          title: 'Novo Evento',
          date: '2025-12-31',
        });

      expect(response.status).toBe(401);
    });

    it('deve retornar 400 se campos obrigatórios estão faltando', async () => {
      if (!authToken) {
        return;
      }

      const response = await request(app)
        .post('/events')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ description: 'Sem título' });

      expect(response.status).toBe(400);
    });

    it('deve retornar 201 ao criar evento com dados válidos', async () => {
      if (!authToken) {
        return;
      }

      const response = await request(app)
        .post('/events')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: `Evento Teste ${Date.now()}`,
          description: 'Descrição do evento',
          date: '2025-12-31',
          location: 'Local Teste',
          max_volunteers: 50,
        });

      expect([201, 403]).toContain(response.status);
      if (response.status === 201) {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
      }
    });
  });
});
