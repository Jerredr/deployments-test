const { createClient } = require('launchdarkly-js-client-sdk');

// A "context" is a data object representing users, devices, organizations, and
// other entities. You'll need this later, but you can ignore it for now.
const context = {
  kind: 'user',
  key: 'EXAMPLE_CONTEXT_KEY'
};

async function initializeLD() {
  const client = createClient('699928b701276309ef773348', context);
  client.start();

  const { status } = await client.waitForInitialization();

  if (status === 'complete') {
    console.log('SDK successfully initialized!');
  } else {
    console.error('Initialization failed');
  }
}

initializeLD();

module.exports = { initializeLD };
