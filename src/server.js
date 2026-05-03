// src/server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// importa routers
const authRouter = require("./APIs/auth/index.js");
const homeRouter = require("./APIs/home/index.js");
const artistasRouter = require("./APIs/artistas/index.js");
const usuariosRouter = require("./APIs/usuarios/index.js");
const notificacoesRouter = require("./APIs/notificacoes/index.js");
const acessibilidadeRouter = require("./APIs/acessibilidade/index.js");
const musicaRouter = require('./APIs/artistas/musicas.js');
const pesquisaRouter = require('./apis/pesquisa/index.js');

// cria o app
const app = express();
app.use(bodyParser.json());
app.use(express.json());

// monta as rotas principais
app.use("/auth", authRouter);
app.use("/home", homeRouter);
app.use("/artistas", artistasRouter);
app.use("/usuarios", usuariosRouter);
app.use("/notificacoes", notificacoesRouter);
app.use("/acessibilidade", acessibilidadeRouter);
app.use('/artistas/musica', musicaRouter);
app.use('/pesquisa', pesquisaRouter);
// exporta o app para testes
module.exports = app;

// se rodar diretamente, inicia servidor
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}


const dbPath = path.join(__dirname, "data", "db.json");


function readDB() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

function writeDB(content) {
  fs.writeFileSync(dbPath, JSON.stringify(content, null, 2));
}

// 1. Listar todas as músicas
app.get("/musicas", (req, res) => {
  const db = readDB();
  res.json(db.musicas);
});

// 2. Buscar música por ID
app.get("/musicas/:id", (req, res) => {
  const db = readDB();
  const musica = db.musicas.find(m => m.id == req.params.id);
  if (!musica) return res.status(404).json({ error: "Música não encontrada" });
  res.json(musica);
});

// 3. Adicionar nova música
app.post("/musicas", (req, res) => {
  const db = readDB();
  try {
    // gera id sequencial baseado no tamanho atual da lista
    const novaMusica = {
      ...req.body,
      id: (db.musicas.length + 1).toString(),
      done: false
    };

    db.musicas.push(novaMusica);
    writeDB(db);

    res.status(201).json(novaMusica);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Atualizar música existente
app.put("/musicas/:id", (req, res) => {
  const db = readDB();
  const index = db.musicas.findIndex(m => m.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Música não encontrada" });

  db.musicas[index] = { ...db.musicas[index], ...req.body };
  writeDB(db);
  res.json(db.musicas[index]);
});

// 5. Remover música
app.delete("/musicas/:id", (req, res) => {
  const db = readDB();
  const novaLista = removeRecord(db.musicas, req.params.id);
  db.musicas = novaLista;
  writeDB(db);
  res.json({ message: "Música removida com sucesso" });
});

// 6. Contar músicas pendentes
app.get("/musicas/pending", (req, res) => {
  const db = readDB();
  const qtd = countPending(db.musicas);
  res.json({ pendentes: qtd });
});