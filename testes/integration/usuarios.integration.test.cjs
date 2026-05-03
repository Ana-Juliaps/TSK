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

  test('PUT /usuarios/:id/foto deve atualizar foto de perfil', async () => {
  const res = await request(app)
    .put('/usuarios/1/foto')
    .send({ foto: 'novaFoto.png' });
  expect(res.statusCode).toBe(200);
  expect(res.body.foto).toBe('novaFoto.png');
  });

  test('PUT /usuarios/:id/configuracoes deve atualizar idioma e notificações', async () => {
    const res = await request(app)
      .put('/usuarios/1/configuracoes')
      .send({ idioma: 'en-US', notificacoes: false });
    expect(res.statusCode).toBe(200);
    expect(res.body.configuracoes.idioma).toBe('en-US');
  });

  test('GET /usuarios/:id/artistas deve retornar lista de artistas seguidos', async () => {
    const res = await request(app).get('/usuarios/1/artistas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
