const service = require('./service.js');

async function listar(req, res) {
  const userId = req.query.userId;
  const data = await service.obterHome(userId);
  res.json(data);
}

module.exports = { listar };
