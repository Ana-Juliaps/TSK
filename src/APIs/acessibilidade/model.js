let configuracoes = {
  modo: 'claro', // claro ou escuro
  contraste: false,
  leitorTela: false,
  legendas: false
};

function getConfig() {
  return configuracoes;
}

function updateConfig(data) {
  configuracoes = { ...configuracoes, ...data };
  return configuracoes;
}

module.exports = { getConfig, updateConfig };
