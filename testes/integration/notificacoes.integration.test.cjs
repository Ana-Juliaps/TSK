const request = require('supertest');
const app = require('../../src/server.js');

describe('Notificacoes API', () => {
  test('POST /notificacoes deve criar notificação nova', async () => {
    const res = await request(app)
      .post('/notificacoes')
      .send({ titulo: 'Novo comeback', mensagem: 'StrayKids lançará álbum amanhã!' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.titulo).toBe('Novo comeback');
  });

  test('GET /notificacoes deve listar notificações', async () => {
    const res = await request(app).get('/notificacoes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
