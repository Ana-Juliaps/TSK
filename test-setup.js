// test-setup.js (na raiz)
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'src/data/db.json');
const baseDbPath = path.resolve(__dirname, 'src/data/db.base.json');

beforeAll(() => {
  if (!fs.existsSync(baseDbPath)) throw new Error('db.base.json não encontrado');
  const baseData = fs.readFileSync(baseDbPath, 'utf-8');
  fs.writeFileSync(dbPath, baseData, 'utf-8');
  delete require.cache[require.resolve(dbPath)];
});



