// src/apis/notificacoes/index.js
const router = require('./routes.js');

// rota de teste
router.get('/', (req, res) => {
  res.json({ message: 'Notificações API funcionando!' });
});

module.exports = router;
