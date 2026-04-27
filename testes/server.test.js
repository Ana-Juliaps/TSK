const request = require("supertest");
const app = require("../src/server"); // exporte o app no server.js

describe("Rotas do servidor TSK", () => {
  test("GET /musicas deve retornar lista", async () => {
    const res = await request(app).get("/musicas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /musicas deve adicionar música", async () => {
    const res = await request(app)
      .post("/musicas")
      .send({ title: "Blind Spot", artist: "StrayKids" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Blind Spot");
  });

  test("DELETE /musicas/:id deve remover música", async () => {
    const add = await request(app)
      .post("/musicas")
      .send({ title: "Blind Spot", artist: "StrayKids" });
    const id = add.body.id;

    const del = await request(app).delete(`/musicas/${id}`);
    expect(del.statusCode).toBe(200);
    expect(del.body.message).toBe("Música removida com sucesso");
  });
});
