// src/apis/artistas/index.js
const express = require('express');
const router = require('./routes.js');

// rota de teste
router.get('/', (req, res) => {
  res.json({ message: 'Artistas API funcionando!' });
});

module.exports = router;
