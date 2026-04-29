// src/apis/acessibilidade/index.js
const router = require('./routes.js');


// rota de teste
router.get('/', (req, res) => {
  res.json({ message: 'Acessibilidade API funcionando!' });
});

module.exports = router;
