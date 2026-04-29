const request = require('supertest');
const app = require('../../src/server.js');

describe('Acessibilidade API', () => {
  test('GET /acessibilidade deve retornar configurações atuais', async () => {
    const res = await request(app).get('/acessibilidade');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('modo');
    expect(res.body).toHaveProperty('contraste');
  });

  test('PUT /acessibilidade deve atualizar configurações', async () => {
    const res = await request(app)
      .put('/acessibilidade')
      .send({ modo: 'escuro', contraste: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.modo).toBe('escuro');
    expect(res.body.contraste).toBe(true);
  });
});
