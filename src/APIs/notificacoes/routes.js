const express = require('express');
const controller = require('./controller.js');
const router = express.Router();

router.post('/', controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.delete('/:id', controller.remover);

// Novas rotas
router.put('/:id/lida', controller.marcarLida);
router.put('/:id/arquivar', controller.arquivar);

module.exports = router;

