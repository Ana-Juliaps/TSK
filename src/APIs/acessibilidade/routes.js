const express = require('express');
const controller = require('./controller.js');
const router = express.Router();

// GET - listar configurações atuais
router.get('/', controller.listar);

// PUT - atualizar configurações
router.put('/', controller.atualizar);

module.exports = router;
