const express = require('express');
const controller = require('./controller.js');
const router = express.Router();

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/:id/seguir', controller.acompanhar);
router.post('/:id/deixar', controller.deixarDeAcompanhar);

module.exports = router;

