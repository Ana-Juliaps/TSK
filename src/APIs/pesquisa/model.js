const artistasModel = require('../artistas/model.js');
const usuariosModel = require('../usuarios/model.js');

async function pesquisar(query) {
  const termo = query.toLowerCase();

  const allArtists = await artistasModel.getAll();
  const artistas = allArtists.filter(a =>
    (a.nome && a.nome.toLowerCase().includes(termo)) || (a.descricao && a.descricao.toLowerCase().includes(termo))
  );

  const usuarios = (await usuariosModel.getAllUsers()).filter(u =>
    (u.name && u.name.toLowerCase().includes(termo)) || (u.bias && u.bias.toLowerCase().includes(termo))
  );

  return { artistas, usuarios };
}

module.exports = { pesquisar };
