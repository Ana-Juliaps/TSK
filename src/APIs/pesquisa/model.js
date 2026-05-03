const artistasModel = require('../artistas/model.js');
const usuariosModel = require('../usuarios/model.js');

function pesquisar(query) {
  const termo = query.toLowerCase();

  const artistas = artistasModel.getAll().filter(a =>
    a.nome.toLowerCase().includes(termo) || a.descricao.toLowerCase().includes(termo)
  );

  const usuarios = usuariosModel.getAllUsers().filter(u =>
    u.name.toLowerCase().includes(termo) || u.bias.toLowerCase().includes(termo)
  );

  return { artistas, usuarios };
}

module.exports = { pesquisar };
