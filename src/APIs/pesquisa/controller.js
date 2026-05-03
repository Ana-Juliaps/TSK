const service = require('./service.js');

async function pesquisar(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Parâmetro q é obrigatório' });

  const resultados = service.pesquisar(q);
  res.json(resultados);
}

module.exports = { pesquisar };
