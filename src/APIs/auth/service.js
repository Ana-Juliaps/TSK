// src/apis/auth/service.js
const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');

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

async function login(email, password) {
  const db = await readDB();
  db.usuarios = db.usuarios || [];

  const normalizedEmail = email.trim().toLowerCase();
  const user = db.usuarios.find(u =>
    u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  return user || null;
}


async function register(name, email, password) {
  const db = await readDB();
  const exists = db.users.find(u => u.email === email);
  if (exists) throw new Error('E-mail já cadastrado');

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), name, email, password: hashed };

  db.users.push(newUser);
  await writeDB(db);

  return newUser;
}

module.exports = { login, register };

