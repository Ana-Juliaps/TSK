const request = require('supertest');
const app = require('../../src/server'); // ajuste o caminho conforme seu projeto

describe('Auth Integration Tests', () => {
  const userData = { name: 'Ana', email: 'ana@test.com', password: '12345678' };

  it('POST /auth/register deve criar usuário novo', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe(userData.email.toLowerCase());
  });

  it('POST /auth/register deve falhar se e-mail já existe', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('E-mail já cadastrado');
  });

  it('POST /auth/login deve autenticar usuário válido', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: userData.email, password: userData.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login realizado com sucesso');
    expect(res.body.user.email).toBe(userData.email.toLowerCase());
  });

  it('POST /auth/login deve falhar com credenciais inválidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'naoexiste@test.com', password: 'senhaerrada' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Credenciais inválidas');
  });
});
