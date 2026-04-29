// Dados simulados em memória
let homeData = {
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

function getHomeData() {
  return homeData;
}

module.exports = { getHomeData };
