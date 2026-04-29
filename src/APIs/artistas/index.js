// src/apis/artistas/index.js
const express = require('express');
const router = express.Router();

// rota de teste
router.get('/', (req, res) => {
  res.json({ message: 'Artistas API funcionando!' });
});

module.exports = router;
