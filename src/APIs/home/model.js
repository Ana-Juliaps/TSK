const usuariosModel = require('../usuarios/model.js');
const artistasModel = require('../artistas/model.js');

const baseHomeData = {
  artistasSeguidos: [
    { id: 1, nome: 'BTS', icone: '🎤' },
    { id: 2, nome: 'BLACKPINK', icone: '🎶' }
  ],
  atualizacoesRecentes: [
    { artista: 'BTS', noticia: 'Novo álbum anunciado' },
    { artista: 'BLACKPINK', noticia: 'Show confirmado em Seul' }
  ],
  comebacks: [
    { grupo: 'BTS', mensagem: 'Comeback em Junho!' },
    { grupo: 'BLACKPINK', mensagem: 'Novo single em Maio!' }
  ],
  recomendacoes: [
    { grupo: 'Stray Kids', motivo: 'Baseado no seu perfil' },
    { grupo: 'SEVENTEEN', motivo: 'Popular entre fãs similares' }
  ]
};

async function getHomeData(userId) {
  const user = userId ? await usuariosModel.getUserById(userId) : null;
  if (!user) return baseHomeData;

  const followedArtistIds = Array.isArray(user.artistasSeguidos) ? user.artistasSeguidos : [];
  const allArtists = await artistasModel.getAll();
  const artistasSeguidos = followedArtistIds
    .map(id => allArtists.find(a => a.id == id))
    .filter(Boolean)
    .map(artista => ({ id: artista.id, nome: artista.nome, icone: artista.icone || '🎤' }));

  const atualizacoesRecentes = artistasSeguidos.length > 0
    ? artistasSeguidos.map(artista => ({ artista: artista.nome, noticia: `Novidades recentes de ${artista.nome}` }))
    : baseHomeData.atualizacoesRecentes;

  const comebacks = artistasSeguidos.length > 0
    ? artistasSeguidos.map(artista => ({ grupo: artista.nome, mensagem: `Novo comeback de ${artista.nome} em breve` }))
    : baseHomeData.comebacks;

  const recommended = allArtists
    .filter(a => !followedArtistIds.includes(a.id))
    .slice(0, 4)
    .map(artista => ({ grupo: artista.nome, motivo: `Recomendado para você com base em ${user.bias || 'seus gostos'}` }));

  const recomendacoes = recommended.length > 0 ? recommended : baseHomeData.recomendacoes;

  return {
    artistasSeguidos,
    atualizacoesRecentes,
    comebacks,
    recomendacoes
  };
}

module.exports = { getHomeData };
