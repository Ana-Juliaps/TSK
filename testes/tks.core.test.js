// tests/tks.core.test.js
const { addRecord, removeRecord, countPending } = require('../src/tks');

describe('TKS core functions', () => {
  test('Caminho feliz addRecord adiciona um item', () => {
    const list = [];
    const result = addRecord(list, { title: 'Vacina', description: 'Lembrar vacina' });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ title: 'Vacina', description: 'Lembrar vacina', done: false });
  });

  test('Entrada inválida addRecord lança erro quando title vazio', () => {
    const list = [];
    expect(() => addRecord(list, { title: '' })).toThrow('Invalid title');
    expect(() => addRecord(list, null)).toThrow('Invalid title');
  });

  test('Caso limite removeRecord com id inexistente não altera lista', () => {
    const list = [
      { id: '1', title: 'A', done: false },
      { id: '2', title: 'B', done: true }
    ];
    const after = removeRecord(list, '999');
    expect(after).toHaveLength(2);
    expect(after).toEqual(list);
    expect(countPending(after)).toBe(1);
  });
});