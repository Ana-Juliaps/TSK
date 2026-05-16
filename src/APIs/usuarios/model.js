// src/APIs/usuarios/model.js
const fs = require('fs/promises');
const path = require('path');

const dbPath = path.resolve('src/data/db.json');

async function readDB() {
  const data = await fs.readFile(dbPath, 'utf-8');
  const db = JSON.parse(data);
  db.users = db.users || [];
  return db;
}

async function writeDB(data) {
  data.users = data.users || [];
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

// CRUD básico
async function createUser({ name, bias, idade }) {
  const db = await readDB();
  const id = db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1;
  const novoUsuario = {
    id,
    name,
    email: `${name.toLowerCase()}@tsk.com`,
    password: 'hashedpassword', // placeholder
    foto: 'default.png',
    bias,
    idade,
    artistasSeguidos: [],
    musicasCurtidas: [],
    idioma: 'pt'
  };
  db.users.push(novoUsuario);
  await writeDB(db);
  return novoUsuario;
}

async function getAllUsers() {
  const db = await readDB();
  return db.users;
}

async function getUserById(id) {
  const db = await readDB();
  return db.users.find(u => u.id == id);
}

async function updateUser(id, data) {
  const db = await readDB();
  const usuario = db.users.find(u => u.id == id);
  if (!usuario) return null;
  Object.assign(usuario, data);
  await writeDB(db);
  return usuario;
}

async function deleteUser(id) {
  const db = await readDB();
  db.users = db.users.filter(u => u.id != id);
  await writeDB(db);
  return true;
}

// Funções extras da Tela do Usuário
async function updateFoto(id, foto) {
  const db = await readDB();
  const usuario = db.users.find(u => u.id == id);
  if (!usuario) return null;
  usuario.foto = foto;
  await writeDB(db);
  return usuario;
}

async function updateConfig(id, config) {
  const db = await readDB();
  const usuario = db.users.find(u => u.id == id);
  if (!usuario) return null;
  usuario.configuracoes = { ...usuario.configuracoes, ...config };
  await writeDB(db);
  return usuario;
}

async function getArtistasSeguidos(id) {
  const db = await readDB();
  const usuario = db.users.find(u => u.id == id);
  if (!usuario) return null;
  return usuario.artistasSeguidos;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateFoto,
  updateConfig,
  getArtistasSeguidos
};
