// Get all the elements
const modeToggle = document.getElementById('modeToggle');
const futuresSection = document.getElementById('futuresSection');
const leverageSlider = document.getElementById('leverageSlider');
const leverageValue = document.getElementById('leverageValue');
const buyLongBtn = document.getElementById('buyLongBtn');
const sellShortBtn = document.getElementById('sellShortBtn');
const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('results');
const pnlResult = document.getElementById('pnlResult');
const finalBalance = document.getElementById('finalBalance');

// Spot and Futures Calculation
let isFuturesMode = false;
let tradeDirection = null; // 'long' or 'short'

// Update leverage value based on slider
leverageSlider.addEventListener('input', function () {
    leverageValue.textContent = leverageSlider.value + 'x';
});

// Toggle between Spot and Futures Mode
modeToggle.addEventListener('change', function () {
    isFuturesMode = modeToggle.checked;
    if (isFuturesMode) {
        futuresSection.classList.remove('hidden');
    } else {
        futuresSection.classList.add('hidden');
    }
    resetCalculator();
});

// Buy Long or Sell Short buttons
buyLongBtn.addEventListener('click', function () {
    tradeDirection = 'long';
    buyLongBtn.style.backgroundColor = '#00c853'; // Green color for Buy Long
    sellShortBtn.style.backgroundColor = '#d32f2f'; // Red color for Sell Short
});

sellShortBtn.addEventListener('click', function () {
    tradeDirection = 'short';
    sellShortBtn.style.backgroundColor = '#d32f2f'; // Red color for Sell Short
    buyLongBtn.style.backgroundColor = '#00c853'; // Green color for Buy Long
});

// Calculate button click event
calculateBtn.addEventListener('click', function () {
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const exitPrice = parseFloat(document.getElementById('exitPrice').value);
    const investment = parseFloat(document.getElementById('investment').value);
    const leverage = parseFloat(leverageSlider.value);

    // Validate input
    if (isNaN(entryPrice) || isNaN(exitPrice) || isNaN(investment) || entryPrice <= 0 || exitPrice <= 0 || investment <= 0) {
        alert('Please enter valid values.');
        return;
    }

    // Calculate PnL
    let pnl = 0;
    let finalBalanceAmount = 0;

    if (isFuturesMode) {
        // Futures calculation: PnL = ((Exit Price - Entry Price) / Entry Price) * Leverage * Investment
        if (tradeDirection === 'long') {
            pnl = ((exitPrice - entryPrice) / entryPrice) * leverage * investment;
        } else if (tradeDirection === 'short') {
            pnl = ((entryPrice - exitPrice) / entryPrice) * leverage * investment;
        } else {
            alert('Please select either Buy Long or Sell Short.');
            return;
        }
    } else {
        // Spot calculation: PnL = (Exit Price - Entry Price) * Investment
        pnl = (exitPrice - entryPrice) * investment;
    }

    // Calculate final balance after PnL
    finalBalanceAmount = investment + pnl;

    // Display the results
    pnlResult.textContent = `Profit/Loss: $${pnl.toFixed(2)}`;
    finalBalance.textContent = `Final Balance: $${finalBalanceAmount.toFixed(2)}`;

    resultsSection.classList.remove('hidden');
});

// Reset calculator values
function resetCalculator() {
    tradeDirection = null;
    buyLongBtn.style.backgroundColor = '#28a745'; // Default color for Buy Long
    sellShortBtn.style.backgroundColor = '#dc3545'; // Default color for Sell Short
    resultsSection.classList.add('hidden');
    document.getElementById('entryPrice').value = '';
    document.getElementById('exitPrice').value = '';
    document.getElementById('investment').value = '';
    leverageSlider.value = 1;
    leverageValue.textContent = '1x';
}
