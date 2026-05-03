let notificacoes = [
  { id: 1, tipo: 'evento', mensagem: 'Novo show do BTS', lida: false, arquivada: false, artistaId: 1 },
  { id: 2, tipo: 'album', mensagem: 'BLACKPINK lançou novo álbum', lida: false, arquivada: false, artistaId: 2 }
];

function createNotificacao(data) {
  const nova = { id: notificacoes.length + 1, ...data, lida: false, arquivada: false };
  notificacoes.push(nova);
  return nova;
}

function getAll(tipo) {
  return tipo ? notificacoes.filter(n => n.tipo === tipo) : notificacoes;
}

function getById(id) {
  return notificacoes.find(n => n.id == id);
}

function remove(id) {
  notificacoes = notificacoes.filter(n => n.id != id);
  return true;
}

function marcarLida(id) {
  const n = getById(id);
  if (!n) return null;
  n.lida = true;
  return n;
}

function arquivar(id) {
  const n = getById(id);
  if (!n) return null;
  n.arquivada = true;
  return n;
}

module.exports = { createNotificacao, getAll, getById, remove, marcarLida, arquivar };

