const fs = require('fs');
const path = require('path');
const authService = require('./service.js');

const DB_PATH = path.resolve(__dirname, '../../data/db.json');

// Funções auxiliares para manipular o "banco"
function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// POST /auth/login


async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password); // 👈 usa o service

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    return res.json({ message: 'Login realizado com sucesso', user });
  } catch (err) {
    console.error('Erro no login:', err.message);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

module.exports = { login };


// POST /auth/register
async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const db = readDB();              // lê o db.json
  db.usuarios = db.usuarios || [];

  // 🔹 Passo 1: verificação de e-mail duplicado
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = db.usuarios.find(u => u.email.toLowerCase() === normalizedEmail);

  if (existingUser) {
    return res.status(400).json({ error: 'E-mail já cadastrado' });
  }

  // Cria novo usuário
  const newUser = {
    id: db.usuarios.length + 1,
    name,
    email: normalizedEmail,
    password
  };

  db.usuarios.push(newUser);
  writeDB(db);                      // salva no db.json

  res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
}


module.exports = { login, register };


