const service = require('./service.js');

async function listar(req, res) {
  const data = service.obterHome();
  res.json(data);
}

module.exports = { listar };
