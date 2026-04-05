const { addRecord, removeRecord, countPending } = require('../src/tks');

describe('Tudo Sobre Kpop core functions', () => {
  test('Caminho feliz: addRecord adiciona um registro Kpop', () => {
    const list = [];
    const record = { title: 'Jump', artist: 'BLACKPINK', type: 'single', notes: 'Lançamento 2025' };
    const result = addRecord(list, record);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: 'Jump',
      artist: 'BLACKPINK',
      type: 'single',
      notes: 'Lançamento 2025',
      done: false
    });
  });

  test('Entrada inválida: addRecord lança erro quando title vazio', () => {
    const list = [];
    expect(() => addRecord(list, { title: '', artist: 'StrayKids' })).toThrow('Invalid title');
    expect(() => addRecord(list, null)).toThrow('Invalid title');
  });

  test('Caso limite: removeRecord com id inexistente não altera a lista', () => {
    const list = [
      { id: '1', title: 'Do It', artist: 'StrayKids', done: false },
      { id: '2', title: 'How You Like That', artist: 'BLACKPINK', done: true }
    ];
    const after = removeRecord(list, '999');
    expect(after).toHaveLength(2);
    expect(after).toEqual(list);
    expect(countPending(after)).toBe(1);
  });
});