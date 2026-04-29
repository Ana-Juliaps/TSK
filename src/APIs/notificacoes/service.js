const model = require('./model.js');

function criarNotificacao(data) {
  return model.createNotification(data);
}

function listarNotificacoes() {
  return model.getAllNotifications();
}

function buscarNotificacao(id) {
  return model.getNotificationById(id);
}

function removerNotificacao(id) {
  return model.deleteNotification(id);
}

module.exports = { criarNotificacao, listarNotificacoes, buscarNotificacao, removerNotificacao };
