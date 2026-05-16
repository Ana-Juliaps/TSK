const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const dbPath = path.resolve(__dirname, 'src/data/db.json');
  const baseDbPath = path.resolve(__dirname, 'src/data/db.base.json');

  if (!fs.existsSync(baseDbPath)) throw new Error('db.base.json não encontrado');
  const baseData = fs.readFileSync(baseDbPath, 'utf-8');
  fs.writeFileSync(dbPath, baseData, 'utf-8');
};



