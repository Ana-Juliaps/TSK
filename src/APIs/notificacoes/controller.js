const service = require('./service.js');

async function criar(req, res) {
  const notificacao = service.criarNotificacao(req.body);
  res.status(201).json(notificacao);
}

async function listar(req, res) {
  res.json(service.listarNotificacoes());
}

async function buscar(req, res) {
  const notificacao = service.buscarNotificacao(req.params.id);
  if (!notificacao) return res.status(404).json({ error: 'Notificação não encontrada' });
  res.json(notificacao);
}

async function remover(req, res) {
  service.removerNotificacao(req.params.id);
  res.status(204).send();
}

module.exports = { criar, listar, buscar, remover };
