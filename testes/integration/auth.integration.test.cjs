// testes/integration/auth.integration.test.cjs
const fs = require('fs/promises');
const path = require('path');
const request = require('supertest');
const app = require('../../src/server.js');

const dbPath = path.resolve('src/data/db.json');

describe('Auth Integration Tests', () => {
  // Antes de cada teste, resetamos o db.json
  beforeEach(async () => {
    const db = { users: [] };
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
  });

  test('POST /auth/register deve criar usuário novo', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'Ana', email: 'ana@test.com', password: '12345678' });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe('ana@test.com');
  });

  test('POST /auth/register deve falhar se e-mail já existe', async () => {
    // cria usuário inicial
    await request(app)
      .post('/auth/register')
      .send({ name: 'Ana', email: 'ana@test.com', password: '12345678' });

    // tenta cadastrar novamente
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'Ana', email: 'ana@test.com', password: '12345678' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('E-mail já cadastrado');
  });

  test('POST /auth/login deve autenticar usuário válido', async () => {
    // cria usuário
    await request(app)
      .post('/auth/register')
      .send({ name: 'Ana', email: 'ana@test.com', password: '12345678' });

    // tenta login
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'ana@test.com', password: '12345678' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login realizado com sucesso');
  });

  test('POST /auth/login deve falhar com senha incorreta', async () => {
    // cria usuário
    await request(app)
      .post('/auth/register')
      .send({ name: 'Ana', email: 'ana@test.com', password: '12345678' });

    // tenta login com senha errada
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'ana@test.com', password: 'senhaErrada' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Credenciais inválidas');
  });
});
