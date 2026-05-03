const service = require('./service.js');

async function listar(req, res) {
  res.json(service.listarArtistas());
}

async function buscar(req, res) {
  const artista = service.buscarArtista(req.params.id);
  if (!artista) return res.status(404).json({ error: 'Artista não encontrado' });
  res.json(artista);
}

async function acompanhar(req, res) {
  const artista = service.acompanharArtista(req.params.id, req.body.userId);
  if (!artista) return res.status(404).json({ error: 'Artista não encontrado' });
  res.json(artista);
}

async function deixarDeAcompanhar(req, res) {
  const artista = service.deixarDeAcompanhar(req.params.id, req.body.userId);
  if (!artista) return res.status(404).json({ error: 'Artista não encontrado' });
  res.json(artista);
}

module.exports = { listar, buscar, acompanhar, deixarDeAcompanhar };
