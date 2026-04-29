const request = require('supertest');
const app = require('../../src/server.js');

describe('Home API', () => {
  test('GET /home deve retornar dados iniciais', async () => {
    const res = await request(app).get('/home');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('artistasSeguidos');
    expect(res.body).toHaveProperty('atualizacoesRecentes');
    expect(res.body).toHaveProperty('comebacks');
    expect(res.body).toHaveProperty('recomendacoes');
  });
});
