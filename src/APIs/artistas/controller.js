const { getArtistInfo, saveArtistToDB } = require('../../integrations/musicbrainz');
const db = require('../../data/db.json');

// src/APIs/artistas/controller.js

async function getArtist(req, res) {
  try {
    const { mbid } = req.params; // o ID do artista vem da URL
    const artist = await getArtistInfo(mbid);
    return res.json(artist);
  } catch (err) {
    console.error('Erro ao buscar artista:', err.message);
    return res.status(500).json({ error: 'Erro ao buscar artista' });
  }
}

async function createArtist(req, res) {
  try {
    const artistData = req.body;
    const saved = await saveArtistToDB(artistData); // usa a função
    return res.status(201).json({ message: 'Artista salvo com sucesso', artist: saved });
  } catch (err) {
    console.error('Erro ao salvar artista:', err.message);
    return res.status(500).json({ error: 'Erro ao salvar artista' });
  }
}

// Listar todos artistas salvos
function listar(req, res) {
  res.json(db.artistas || []);
}

// Buscar artista por ID local
function buscar(req, res) {
  const { id } = req.params;
  const artist = db.artistas.find(a => a.id === parseInt(id));
  if (!artist) return res.status(404).json({ error: 'Artista não encontrado' });
  res.json(artist);
}

// Seguir artista
function acompanhar(req, res) {
  const { userId } = req.body;
  const { id } = req.params;

  db.usuarios = db.usuarios || [];

  let usuario = db.usuarios.find(u => u.id === parseInt(userId));
  if (!usuario) {
    usuario = { id: parseInt(userId), artistasSeguidos: [] };
    db.usuarios.push(usuario);
  }

  usuario.artistasSeguidos = usuario.artistasSeguidos || [];
  if (!usuario.artistasSeguidos.includes(parseInt(id))) {
    usuario.artistasSeguidos.push(parseInt(id));
  }

  res.json({ message: 'Agora você segue o artista', usuario });
}



// Deixar de seguir artista
function deixarDeAcompanhar(req, res) {
  const { userId } = req.body;
  const { id } = req.params;

  db.usuarios = db.usuarios || [];

  let usuario = db.usuarios.find(u => u.id === parseInt(userId));
  if (!usuario) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  usuario.artistasSeguidos = (usuario.artistasSeguidos || []).filter(aid => aid !== parseInt(id));

  res.json({ message: 'Você deixou de seguir o artista', usuario });
}

module.exports = { getArtist, listar, buscar, acompanhar, deixarDeAcompanhar, createArtist };
