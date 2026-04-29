let notificacoes = [];
let idCounter = 1;

function createNotification({ titulo, mensagem }) {
  const nova = { id: idCounter++, titulo, mensagem, data: new Date().toISOString() };
  notificacoes.push(nova);
  return nova;
}

function getAllNotifications() {
  return notificacoes;
}

function getNotificationById(id) {
  return notificacoes.find(n => n.id == id);
}

function deleteNotification(id) {
  notificacoes = notificacoes.filter(n => n.id != id);
  return true;
}

module.exports = { createNotification, getAllNotifications, getNotificationById, deleteNotification };
