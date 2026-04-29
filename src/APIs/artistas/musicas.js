// src/apis/artistas/musica.js
const express = require('express');
const { getArtistInfo } = require('../../integrations/musicbrainz.js');

const router = express.Router();

router.get('/artist/:mbid', async (req, res) => {
  try {
    const data = await getArtistInfo(req.params.mbid);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


