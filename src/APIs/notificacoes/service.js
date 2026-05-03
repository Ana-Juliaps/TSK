const model = require('./model.js');

function criar(data) {
  return model.createNotificacao(data);
}

function listar(tipo) {
  return model.getAll(tipo);
}

function buscar(id) {
  return model.getById(id);
}

function remover(id) {
  return model.remove(id);
}

function marcarComoLida(id) {
  return model.marcarLida(id);
}

function arquivarNotificacao(id) {
  return model.arquivar(id);
}

module.exports = { criar, listar, buscar, remover, marcarComoLida, arquivarNotificacao };

