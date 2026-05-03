const request = require('supertest');
const app = require('../../src/server.js');

describe('Artistas API', () => {
  test('GET /artistas deve listar artistas', async () => {
    const res = await request(app).get('/artistas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /artistas/:id deve retornar artista específico', async () => {
    const res = await request(app).get('/artistas/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome');
  });

  test('POST /artistas/:id/seguir deve adicionar seguidor', async () => {
    const res = await request(app)
      .post('/artistas/1/seguir')
      .send({ userId: 'user123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.seguidores).toContain('user123');
  });

  test('POST /artistas/:id/deixar deve remover seguidor', async () => {
    const res = await request(app)
      .post('/artistas/1/deixar')
      .send({ userId: 'user123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.seguidores).not.toContain('user123');
  });
});
