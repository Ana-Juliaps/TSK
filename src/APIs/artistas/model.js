let artistas = [
  {
    id: 1,
    nome: 'Stray Kids',
    descricao: 'Grupo sul-coreano de K-pop',
    eventos: ['Show no Rock in Rio', 'Fan meeting online'],
    albuns: ['Karma', 'Noeasy'],
    votacoes: ['Melhor Grupo Masculino', 'Melhor Álbum de K-pop'],
    seguidores: []
  }
];

function getAll() {
  return artistas;
}

function getById(id) {
  return artistas.find(a => a.id == id);
}

function follow(id, userId) {
  const artista = getById(id);
  if (!artista) return null;
  if (!artista.seguidores.includes(userId)) artista.seguidores.push(userId);
  return artista;
}

function unfollow(id, userId) {
  const artista = getById(id);
  if (!artista) return null;
  artista.seguidores = artista.seguidores.filter(u => u !== userId);
  return artista;
}

module.exports = { getAll, getById, follow, unfollow };
