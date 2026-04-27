function addRecord(list, record) {
  if (!record || typeof record.title !== 'string' || record.title.trim() === '') {
    throw new Error('Invalid title');
  }
  const id = Date.now().toString();
  const item = { id, title: record.title, description: record.description || '', done: false };
  return [...list, item];
}

function removeRecord(list, id) {
  return list.filter(r => r.id !== id);
}

function countPending(list) {
  return list.filter(r => !r.done).length;
}

module.exports = { addRecord, removeRecord, countPending };