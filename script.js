document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display input');
    const history = document.querySelector('.history input');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    function updateDisplay() {
        display.value = currentInput || '0';
    }

    function updateHistory() {
        if (previousInput && operator) {
            history.value = `${previousInput} ${operator}`;
        } else {
            history.value = '';
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;

            if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                resultDisplayed = false;
                updateDisplay();
                history.value = '';
            } else if (value === 'DEL') {
                if (resultDisplayed) {
                    currentInput = '';
                    resultDisplayed = false;
                } else {
                    currentInput = currentInput.slice(0, -1);
                }
                updateDisplay();
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    let a = parseFloat(previousInput);
                    let b = parseFloat(currentInput);
                    let result;
                    switch (operator) {
                        case '+': result = a + b; break;
                        case '-': result = a - b; break;
                        case '*': result = a * b; break;
                        case '/': result = b === 0 ? 'Error' : a / b; break;
                        case '%': result = a % b; break;
                        default: result = b;
                    }
                    history.value = `${previousInput} ${operator} ${currentInput} =`;
                    currentInput = result.toString();
                    updateDisplay();
                    operator = '';
                    previousInput = '';
                    resultDisplayed = true;
                }
            } else if (['+', '-', '*', '/', '%'].includes(value)) {
                if (currentInput) {
                    if (previousInput && operator && !resultDisplayed) {
                        // Chain calculation
                        let a = parseFloat(previousInput);
                        let b = parseFloat(currentInput);
                        let result;
                        switch (operator) {
                            case '+': result = a + b; break;
                            case '-': result = a - b; break;
                            case '*': result = a * b; break;
                            case '/': result = b === 0 ? 'Error' : a / b; break;
                            case '%': result = a % b; break;
                            default: result = b;
                        }
                        previousInput = result.toString();
                    } else {
                        previousInput = currentInput;
                    }
                    operator = value;
                    currentInput = '';
                    resultDisplayed = false;
                    updateHistory();
                } else if (previousInput && operator) {
                    operator = value; // Change operator if pressed again
                    updateHistory();
                }
            } else if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += currentInput ? '.' : '0.';
                    updateDisplay();
                }
            } else if (value === '+/-') {
                if (currentInput) {
                    if (currentInput.startsWith('-')) {
                        currentInput = currentInput.slice(1);
                    } else {
                        currentInput = '-' + currentInput;
                    }
                    updateDisplay();
                }
            } else {
                if (resultDisplayed) {
                    currentInput = value;
                    resultDisplayed = false;
                } else {
                    currentInput += value;
                }
                updateDisplay();
            }
        });
    });
});