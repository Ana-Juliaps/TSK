const model = require('./model.js');

function pesquisar(query) {
  return model.pesquisar(query);
}

module.exports = { pesquisar };
