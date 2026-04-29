let usuarios = [];
let idCounter = 1;

function createUser({ name, bias, idade }) {
  const novoUsuario = { id: idCounter++, name, bias, idade };
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

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
