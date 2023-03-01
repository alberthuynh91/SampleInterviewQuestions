const logs = [
  { user: 1, action: 'A' },
  { user: 1, action: 'B' },
  { user: 2, action: 'A' },
  { user: 1, action: 'C' },
  { user: 2, action: 'B' },
  { user: 3, action: 'Z' },
  { user: 2, action: 'B' },
  { user: 2, action: 'C' },
  { user: 3, action: 'A' },
  { user: 3, action: 'B' },
  { user: 3, action: 'C' },
];

function findConsecutive(logs, sequence = 'ABC') {
  const store = {};
  const result = [];
  for (let i = 0; i < logs.length; i++) {
    if (store[logs[i].user] !== undefined) {
      store[logs[i].user] = store[logs[i].user] + logs[i].action;
      if (store[logs[i].user].includes(sequence)) {
        result.push(logs[i].user);
      }
    } else {
      store[logs[i].user] = logs[i].action;
    }
  }
  return result;
}

console.log(findConsecutive(logs));
