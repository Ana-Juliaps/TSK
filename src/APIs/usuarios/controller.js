const service = require('./service.js');

async function criar(req, res) {
  const usuario = service.criarUsuario(req.body);
  res.status(201).json(usuario);
}

async function listar(req, res) {
  res.json(service.listarUsuarios());
}

async function buscar(req, res) {
  const usuario = service.buscarUsuario(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(usuario);
}

async function atualizar(req, res) {
  const usuario = service.atualizarUsuario(req.params.id, req.body);
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(usuario);
}

async function remover(req, res) {
  service.removerUsuario(req.params.id);
  res.status(204).send();
}

async function atualizarFoto(req, res) {
  const usuario = service.atualizarFoto(req.params.id, req.body.foto);
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(usuario);
}

async function atualizarConfiguracoes(req, res) {
  const usuario = service.atualizarConfiguracoes(req.params.id, req.body);
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(usuario);
}

async function listarArtistasSeguidos(req, res) {
  const artistas = service.listarArtistasSeguidos(req.params.id);
  if (!artistas) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(artistas);
}

module.exports = { criar, listar, buscar, atualizar, remover, atualizarFoto, atualizarConfiguracoes, listarArtistasSeguidos };
