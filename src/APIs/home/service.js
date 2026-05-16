const model = require('./model.js');

async function obterHome(userId) {
  return await model.getHomeData(userId);
}

module.exports = { obterHome };
