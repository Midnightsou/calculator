document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display input');
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
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
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