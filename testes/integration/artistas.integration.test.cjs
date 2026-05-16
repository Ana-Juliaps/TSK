jest.setTimeout(20000);
const request = require('supertest');
const app = require('../../src/server'); // ou o caminho correto do seu servidor Express

describe('Artistas API', () => {
  test('GET /artistas/:mbid deve retornar artista completo', async () => {
    const res = await request(app)
      .get('/artistas/0d79fe8e-ba27-4859-bb8c-2f255f346853'); // BTS MBID
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome');
    expect(res.body).toHaveProperty('descricao');
    expect(res.body).toHaveProperty('releaseGroups');
    expect(res.body).toHaveProperty('releases');
    expect(res.body).toHaveProperty('eventos'); // se incluímos eventos
  });

  test('POST /artistas/:id/seguir deve adicionar artista ao usuário', async () => {
    const res = await request(app)
      .post('/artistas/1/seguir')
      .send({ userId: 1 });

    expect(res.statusCode).toBe(200);
    expect(res.body.usuario.artistasSeguidos).toContain(1);
  });

  test('POST /artistas/:id/deixar deve remover artista do usuário', async () => {
    const res = await request(app)
      .post('/artistas/1/deixar')
      .send({ userId: 1 });

    expect(res.statusCode).toBe(200);
    expect(res.body.usuario.artistasSeguidos).not.toContain(1);
  });
});
