// src/apis/auth/controller.js
const authService = require('./service.js');

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await authService.login(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    return res.json({ message: 'Login realizado com sucesso', user });
  } catch (err) {
    return res.status(500).json({ message: 'Erro no login', error: err.message });
  }
}

async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await authService.register(name, email, password);
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: newUser });
  } catch (err) {
    return res.status(400).json({ message: 'Erro no cadastro', error: err.message });
  }
}

module.exports = { login, register };

