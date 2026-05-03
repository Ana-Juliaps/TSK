// Contador de IDs
let idCounter = 4;

// Seed inicial de usuários
let usuarios = [
  {
    id: 1,
    name: 'Ana',
    email: 'ana@tsk.com',
    senha: 'hashedpassword',
    foto: 'ana.png',
    bias: 'BTS',
    idade: 25,
    artistasSeguidos: [1, 2],
    configuracoes: { idioma: 'pt-BR', notificacoes: true }
  },
  {
    id: 2,
    name: 'João',
    email: 'joao@tsk.com',
    senha: 'hashedpassword',
    foto: 'joao.png',
    bias: 'BLACKPINK',
    idade: 30,
    artistasSeguidos: [2],
    configuracoes: { idioma: 'en-US', notificacoes: false }
  },
  {
    id: 3,
    name: 'Maria',
    email: 'maria@tsk.com',
    senha: 'hashedpassword',
    foto: 'maria.png',
    bias: 'Stray Kids',
    idade: 22,
    artistasSeguidos: [],
    configuracoes: { idioma: 'pt-BR', notificacoes: true }
  }
];

// CRUD básico
function createUser({ name, bias, idade }) {
  const novoUsuario = {
    id: idCounter++,
    name,
    bias,
    idade,
    email: `${name.toLowerCase()}@tsk.com`,
    senha: 'hashedpassword',
    foto: 'default.png',
    artistasSeguidos: [],
    configuracoes: { idioma: 'pt-BR', notificacoes: true }
  };
  usuarios.push(novoUsuario);
  return novoUsuario;
}

function getAllUsers() {
  return usuarios;
}

function getUserById(id) {
  return usuarios.find(u => u.id == id);
}

function updateUser(id, data) {
  const usuario = getUserById(id);
  if (!usuario) return null;
  Object.assign(usuario, data);
  return usuario;
}

function deleteUser(id) {
  usuarios = usuarios.filter(u => u.id != id);
  return true;
}

// Funções extras da Tela do Usuário
function updateFoto(id, foto) {
  const usuario = getUserById(id);
  if (!usuario) return null;
  usuario.foto = foto;
  return usuario;
}

function updateConfig(id, config) {
  const usuario = getUserById(id);
  if (!usuario) return null;
  usuario.configuracoes = { ...usuario.configuracoes, ...config };
  return usuario;
}

function getArtistasSeguidos(id) {
  const usuario = getUserById(id);
  if (!usuario) return null;
  return usuario.artistasSeguidos;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateFoto,
  updateConfig,
  getArtistasSeguidos
};
