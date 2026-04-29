const request = require('supertest');
const app = require('../../src/server.js');

describe('Usuarios API', () => {
  test('POST /usuarios deve criar usuário novo', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ name: 'Ana', bias: 'StrayKids', idade: 22 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.bias).toBe('StrayKids');
  });

  test('GET /usuarios deve listar usuários', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
