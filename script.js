document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display input');
    const history = document.querySelector('.history input');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;

            if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.value = '0';
                history.value = '';
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput || '0';
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    const result = eval(`${previousInput} ${operator} ${currentInput}`);
                    history.value = `${previousInput} ${operator} ${currentInput} =`;
                    currentInput = result;
                    display.value = currentInput;
                    operator = '';
                    previousInput = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });
});