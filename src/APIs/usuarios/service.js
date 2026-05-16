const model = require('./model.js');

async function criarUsuario(data) {
  return await model.createUser(data);
}

async function listarUsuarios() {
  return await model.getAllUsers();
}

async function buscarUsuario(id) {
  return await model.getUserById(id);
}

async function atualizarUsuario(id, data) {
  return await model.updateUser(id, data);
}

async function removerUsuario(id) {
  return await model.deleteUser(id);
}

async function atualizarFoto(id, foto) {
  return await model.updateFoto(id, foto);
}

async function atualizarConfiguracoes(id, config) {
  return await model.updateConfig(id, config);
}

async function listarArtistasSeguidos(id) {
  return await model.getArtistasSeguidos(id);
}

module.exports = { criarUsuario, listarUsuarios, buscarUsuario, atualizarUsuario, removerUsuario, atualizarFoto, atualizarConfiguracoes, listarArtistasSeguidos };
