const request = require('supertest');
const app = require('../../src/server.js');

describe('Pesquisa API', () => {
  test('GET /pesquisa?q=Ana deve retornar usuário', async () => {
    const res = await request(app).get('/pesquisa?q=Ana');
    expect(res.statusCode).toBe(200);
    expect(res.body.usuarios.some(u => u.name === 'Ana')).toBe(true);
  });

  test('GET /pesquisa?q=Stray Kids deve retornar artista', async () => {
    const res = await request(app).get('/pesquisa?q=Stray Kids');
    expect(res.statusCode).toBe(200);
    expect(res.body.artistas.some(a => a.nome === 'Stray Kids')).toBe(true);
  });

  test('GET /pesquisa sem parâmetro deve retornar erro 400', async () => {
    const res = await request(app).get('/pesquisa');
    expect(res.statusCode).toBe(400);
  });
});
