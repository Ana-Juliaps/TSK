const request = require('supertest');
const app = require('../../src/server.js');

describe('Notificacoes API', () => {
  test('POST /notificacoes deve criar uma notificação', async () => {
    const res = await request(app)
      .post('/notificacoes')
      .send({ tipo: 'evento', mensagem: 'Novo fanmeeting do Stray Kids', artistaId: 3 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.tipo).toBe('evento');
  });

  test('GET /notificacoes deve listar todas notificações', async () => {
    const res = await request(app).get('/notificacoes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /notificacoes?tipo=evento deve filtrar por tipo', async () => {
    const res = await request(app).get('/notificacoes?tipo=evento');
    expect(res.statusCode).toBe(200);
    expect(res.body.every(n => n.tipo === 'evento')).toBe(true);
  });

  test('GET /notificacoes/:id deve retornar notificação específica', async () => {
    const res = await request(app).get('/notificacoes/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  test('PUT /notificacoes/:id/lida deve marcar notificação como lida', async () => {
    const res = await request(app).put('/notificacoes/1/lida');
    expect(res.statusCode).toBe(200);
    expect(res.body.lida).toBe(true);
  });

  test('PUT /notificacoes/:id/arquivar deve arquivar notificação', async () => {
    const res = await request(app).put('/notificacoes/1/arquivar');
    expect(res.statusCode).toBe(200);
    expect(res.body.arquivada).toBe(true);
  });

  test('DELETE /notificacoes/:id deve remover notificação', async () => {
    const res = await request(app).delete('/notificacoes/2');
    expect(res.statusCode).toBe(204);
  });
});

