const express = require('express');
const router = express.Router();

// memória temporária (substituir depois por banco de dados)
let usuarios = [];
let idCounter = 1;

// Criar usuário
router.post('/', (req, res) => {
  const { name, bias, idade } = req.body;
  const novoUsuario = { id: idCounter++, name, bias, idade };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// Listar todos usuários
router.get('/', (req, res) => {
  res.json(usuarios);
});

// Buscar usuário por ID
router.get('/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(usuario);
});

// Atualizar usuário
router.put('/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
  usuario.name = req.body.name || usuario.name;
  usuario.bias = req.body.bias || usuario.bias;
  usuario.idade = req.body.idade || usuario.idade;
  res.json(usuario);
});

// Deletar usuário
router.delete('/:id', (req, res) => {
  usuarios = usuarios.filter(u => u.id != req.params.id);
  res.status(204).send();
});

module.exports = router;

