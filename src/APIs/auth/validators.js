// src/apis/auth/validators.js
function validateRegister({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error('Todos os campos são obrigatórios');
  }
  if (password.length < 6) {
    throw new Error('Senha deve ter no mínimo 6 caracteres');
  }
}

module.exports = { validateRegister };



