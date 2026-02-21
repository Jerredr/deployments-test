const test = require('node:test');
const assert = require('node:assert');
const { sum } = require('./math');

test('sum function', (t) => {
  assert.strictEqual(sum(1, 2), 3);
  assert.strictEqual(sum(-1, 1), 0);
  assert.strictEqual(sum(0, 0), 0);
});
