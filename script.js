document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = null;
    let previousInput = '';

    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-key');
            if (key === 'C') {
                clearDisplay();
            } else if (key === '=') {
                calculate();
            } else if (['+', '-', '*', '/'].includes(key)) {
                setOperator(key);
            } else {
                appendToDisplay(key);
            }
        });
    });

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = null;
        display.textContent = '0';
    }

    function appendToDisplay(value) {
        if (currentInput === '0' && value !== '.') {
            currentInput = value; 
        } else {
            currentInput += value;
        }
        display.textContent = currentInput;
    }

    function setOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(curr)) return;

        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        display.textContent = currentInput;
    }
});
