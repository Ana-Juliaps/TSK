// src/apis/auth/validators.js
function validateRegister({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error('Todos os campos são obrigatórios');
  }
  if (password.length < 8) {
    throw new Error('Senha deve ter no mínimo 8 caracteres');
  }
}

module.exports = { validateRegister };



