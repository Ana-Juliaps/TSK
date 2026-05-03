const express = require('express');
const controller = require('./controller.js');
const router = express.Router();

router.post('/', controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);
router.put('/:id/foto', controller.atualizarFoto);
router.put('/:id/configuracoes', controller.atualizarConfiguracoes);
router.get('/:id/artistas', controller.listarArtistasSeguidos);

module.exports = router;
