const test = require('node:test');
const assert = require('node:assert');
const { sum, subtract } = require('./math');

test('sum function', (t) => {
  assert.strictEqual(sum(1, 2), 3);
  assert.strictEqual(sum(-1, 1), 0);
  assert.strictEqual(sum(0, 0), 0);
});

test('subtract function with feature flag', async (t) => {
  // Mock LD Client
  const mockLdClient = {
    variation: (flag, defaultVal) => {
      if (flag === 'enable-subtraction') return t.context.enabled;
      return defaultVal;
    }
  };

  await t.test('works when flag is enabled', (t2) => {
    t.context = { enabled: true };
    assert.strictEqual(subtract(5, 3, mockLdClient), 2);
  });

  await t.test('throws error when flag is disabled', (t2) => {
    t.context = { enabled: false };
    assert.throws(() => subtract(5, 3, mockLdClient), {
      message: 'Subtraction feature is currently disabled'
    });
  });
});
