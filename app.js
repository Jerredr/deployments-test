// Initialize LaunchDarkly
const context = {
  kind: 'user',
  key: 'EXAMPLE_CONTEXT_KEY'
};

const client = LDClient.initialize('699928b701276309ef773348', context);

const statusBadge = document.getElementById('ld-status');
const flagStatusLabel = document.getElementById('flag-status');
const resultValue = document.getElementById('result-value');
const errorBox = document.getElementById('error-message');

function showResult(val) {
    resultValue.textContent = val;
    errorBox.classList.add('hidden');
}

function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.remove('hidden');
    resultValue.textContent = 'Error';
}

client.on('initialized', () => {
    statusBadge.textContent = 'SDK Initialized';
    statusBadge.classList.add('complete');
    updateFlagStatus();
});

client.on('change', () => {
    updateFlagStatus();
});

function updateFlagStatus() {
    const isEnabled = client.variation('enable-subtraction', false);
    flagStatusLabel.textContent = isEnabled ? 'Enabled' : 'Disabled';
}

// Event Listeners
document.getElementById('btn-sum').addEventListener('click', () => {
    const a = parseFloat(document.getElementById('num-a').value);
    const b = parseFloat(document.getElementById('num-b').value);
    showResult(window.mathApp.sum(a, b));
});

document.getElementById('btn-subtract').addEventListener('click', () => {
    const a = parseFloat(document.getElementById('num-a').value);
    const b = parseFloat(document.getElementById('num-b').value);
    try {
        showResult(window.mathApp.subtract(a, b, client));
    } catch (e) {
        showError(e.message);
    }
});
