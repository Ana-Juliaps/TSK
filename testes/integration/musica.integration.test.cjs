// testes/integration/musica.integration.test.cjs
const request = require('supertest');
const app = require('../../src/server.js');

describe('MusicBrainz Artist Info - Kpop', () => {
  test('BTS info via MBID', async () => {
    const res = await request(app).get('/artistas/musica/artist/0d79fe8e-ba27-4859-bb8c-2f255f346853');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toMatch(/BTS/i);
  });

  test('BLACKPINK info via MBID', async () => {
    const res = await request(app).get('/artistas/musica/artist/48646387-1664-4c9a-9139-9bfd091b823c');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toMatch(/BLACKPINK/i);
  });
});


