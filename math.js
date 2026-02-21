function sum(a, b) {
  return a + b;
}

function subtract(a, b, ldClient) {
  const isEnabled = ldClient.variation('enable-subtraction', false);
  if (!isEnabled) {
    throw new Error('Subtraction feature is currently disabled');
  }
  return a - b;
}

module.exports = { sum, subtract };
