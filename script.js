class Calculator {
    constructor(previousDisplay, currentDisplay) {
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
        this.clearAll();
    }

    clearAll() {
        this.previousOutput = '';
        this.currentOutput = '';
        this.operation = '';
    }

    delete() {
        this.currentOutput = this.currentOutput.toString().slice(0, -1);
    }

    chooseOperation(operation) {
        if (this.currentOutput === '') return;
        this.operation = operation;
        this.previousOutput = this.currentOutput;
        this.currentOutput = '';
    }

    appendNumber(number) {
        if (this.currentOutput.includes('.') && number === '.') return;
        this.currentOutput = this.currentOutput.toString() + number.toString();
    }

    inputKeyboardNumber() {
        let keyValue;
        for (let number = 0; number < 10; number++) {
            if (event.key === number.toString()) {
                keyValue = event.key;
            }
        }
        if (event.key === '.') {
            keyValue = event.key;
        }
        return keyValue;
    }

    inputKeyboardOperator() {
        let keyValue;
        switch (event.key) {
            case '/':
                keyValue = '/';
                break;
            case 'x':
                keyValue = 'x';
                break;
            case '*':
                keyValue = 'x';
            case '-':
                keyValue = '-';
                break;
            case '+':
                keyValue = '+';
                break;
        }
        return keyValue;
    }

    inputKeyboardOperate() {
        let keyValue;
        switch (event.key) {
            case 'Enter':
                keyValue = '=';
                break;
            case '=':
                keyValue = '=';
                break;
        }
        return keyValue;
    }

    inputKeyboardDelete() {
        let keyValue;
        if (event.key === 'Backspace') {
            keyValue = event.key;
        }
        return keyValue;
    }

    inputKeyboardAllClear() {
        let keyValue;
        if (event.key === 'Delete') {
            keyValue = event.key;
        }
        return keyValue;
    }

    compute() {
        let result;
        const previousValue = parseFloat(this.previousOutput);
        const currentValue = parseFloat(this.currentOutput);
        if (isNaN(previousValue) || isNaN(currentValue)) return;
        switch (this.operation) {
            case '/':
                result = Math.round((previousValue / currentValue) * 10000) / 10000;
                break;
            case 'x':
                result = Math.round(previousValue * currentValue * 10000) / 10000;
                break;
            case '-':
                result = Math.round((previousValue - currentValue) * 10000) / 10000;
                break;
            case '+':
                result = Math.round((previousValue + currentValue) * 10000) / 10000;
                break;
            default:
                return;
        }
        this.currentOutput = result.toString();
        this.previousOutput = '';
        this.operation = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentDisplay.innerText = this.getDisplayNumber(this.currentOutput);
        if (this.operation !== null) {
            this.previousDisplay.innerText = `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`;
        } else {
            this.previousDisplay.innerText = '';
        }
    }
}

const previousDisplay = document.querySelector('.previous-display');
const currentDisplay = document.querySelector('.current-display');
const operatorBtn = document.querySelectorAll('[data-operator]');
const numberBtn = document.querySelectorAll('[data-number]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const operateBtn = document.querySelector('[data-operate]');

const calculator = new Calculator(previousDisplay, currentDisplay);

numberBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});

operatorBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    });
});

allClearBtn.addEventListener('click', () => {
    calculator.clearAll();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

operateBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

window.addEventListener('keydown', () => {
    console.log(event.key);
    calculator.inputKeyboardNumber();
    calculator.inputKeyboardOperator();
    if (calculator.inputKeyboardNumber()) {
        calculator.appendNumber(calculator.inputKeyboardNumber());
    } else if (calculator.inputKeyboardOperator()) {
        calculator.chooseOperation(calculator.inputKeyboardOperator());
    } else if (calculator.inputKeyboardOperate()) {
        calculator.compute();
    } else if (calculator.inputKeyboardDelete()) {
        calculator.delete();
    } else if (calculator.inputKeyboardAllClear()) {
        calculator.clearAll();
    }
    calculator.updateDisplay();
});
