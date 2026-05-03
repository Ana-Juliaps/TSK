const service = require('./service.js');

async function criar(req, res) {
  const nova = service.criar(req.body);
  res.status(201).json(nova);
}

async function listar(req, res) {
  const notificacoes = service.listar(req.query.tipo);
  res.json(notificacoes);
}

async function buscar(req, res) {
  const n = service.buscar(req.params.id);
  if (!n) return res.status(404).json({ error: 'Notificação não encontrada' });
  res.json(n);
}

async function remover(req, res) {
  service.remover(req.params.id);
  res.status(204).send();
}

async function marcarLida(req, res) {
  const n = service.marcarComoLida(req.params.id);
  if (!n) return res.status(404).json({ error: 'Notificação não encontrada' });
  res.json(n);
}

async function arquivar(req, res) {
  const n = service.arquivarNotificacao(req.params.id);
  if (!n) return res.status(404).json({ error: 'Notificação não encontrada' });
  res.json(n);
}

module.exports = { criar, listar, buscar, remover, marcarLida, arquivar };

