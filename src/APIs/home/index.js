// src/apis/home/index.js
const router = require('./routes.js');

// rota de teste
router.get('/', (req, res) => {
  res.json({ message: 'Home API funcionando!' });
});

module.exports = router;
