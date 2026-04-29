// src/apis/auth/index.js
const router = require('./routes.js');
router.get('/', (req, res) => {
  res.json({ message: 'Home API funcionando!' });
});
module.exports = router;

