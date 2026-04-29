// testes/unit/auth.unit.test.cjs
const { validateRegister } = require('../../src/apis/auth/validators.js');
const authService = require('../../src/apis/auth/service.js');
const fs = require('fs/promises');
const path = require('path');

const dbPath = path.resolve('src/data/db.json');

describe('Auth Unit Tests', () => {
  beforeAll(async () => {
    // garante que o db.json tenha um usuário pré-existente
    const db = { users: [{ id: 1, name: 'Ana', email: 'ana@test.com', password: 'hashfake' }] };
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
  });
  test('Validação de senha curta deve falhar', () => {
    expect(() => validateRegister({ name: 'Ana', email: 'ana@test.com', password: '123' }))
      .toThrow('Senha deve ter no mínimo 8 caracteres');
  });

  test('Cadastro deve lançar erro se e-mail já existe', async () => {
    const email = 'ana@test.com';
    await expect(authService.register('Ana', email, '12345678'))
      .rejects.toThrow('E-mail já cadastrado');
  });
});