const model = require('./model.js');

async function pesquisar(query) {
  return await model.pesquisar(query);
}

module.exports = { pesquisar };
