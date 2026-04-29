const service = require('./service.js');

async function listar(req, res) {
  res.json(service.obterConfiguracoes());
}

async function atualizar(req, res) {
  const config = service.atualizarConfiguracoes(req.body);
  res.json(config);
}

module.exports = { listar, atualizar };
