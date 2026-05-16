const express = require('express');
const controller = require('./controller.js');
const router = express.Router();
const { getArtist } = require('./controller');

// Buscar artista completo pelo MBID (puxa do MusicBrainz e salva no db.json)
router.get('/:mbid', getArtist);

// Listar todos artistas salvos no db.json
router.get('/', controller.listar);

// Buscar artista por ID local (do db.json)
router.get('/id/:id', controller.buscar);

// Seguir / deixar de seguir artista
router.post('/:id/seguir', controller.acompanhar);
router.post('/:id/deixar', controller.deixarDeAcompanhar);

module.exports = router;
