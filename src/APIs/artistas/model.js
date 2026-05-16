const db = require('../../data/db.json');

function findById(id) {
  return db.artistas.find(a => a.id === parseInt(id));
}

function findByMbid(mbid) {
  return db.artistas.find(a => a.mbid === mbid);
}

module.exports = { findById, findByMbid };

