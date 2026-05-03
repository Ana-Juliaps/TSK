const model = require('./model.js');

function listarArtistas() {
  return model.getAll();
}

function buscarArtista(id) {
  return model.getById(id);
}

function acompanharArtista(id, userId) {
  return model.follow(id, userId);
}

function deixarDeAcompanhar(id, userId) {
  return model.unfollow(id, userId);
}

module.exports = { listarArtistas, buscarArtista, acompanharArtista, deixarDeAcompanhar };
