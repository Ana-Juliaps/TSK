const model = require('./model.js');

function obterHome() {
  return model.getHomeData();
}

module.exports = { obterHome };
