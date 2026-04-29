const model = require('./model.js');

function obterConfiguracoes() {
  return model.getConfig();
}

function atualizarConfiguracoes(data) {
  return model.updateConfig(data);
}

module.exports = { obterConfiguracoes, atualizarConfiguracoes };
