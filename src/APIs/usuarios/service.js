const model = require('./model.js');

function criarUsuario(data) {
  return model.createUser(data);
}

function listarUsuarios() {
  return model.getAllUsers();
}

function buscarUsuario(id) {
  return model.getUserById(id);
}

function atualizarUsuario(id, data) {
  return model.updateUser(id, data);
}

function removerUsuario(id) {
  return model.deleteUser(id);
}

module.exports = { criarUsuario, listarUsuarios, buscarUsuario, atualizarUsuario, removerUsuario };
