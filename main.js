// main display
const display = document.querySelector('h1');

// buttons
const btns = document.querySelectorAll('button');

for (const btn of btns) {
    if (btn.classList.contains('number')) {
        btn.addEventListener('click', handleNumbers);
    } else if (btn.classList.contains('operator')) {
        btn.addEventListener('click', handleOperator);
    } else if (btn.classList.contains('equals')) {
        btn.addEventListener('click', handleResult);
    } else if (btn.classList.contains('backspace')) {
        btn.addEventListener('click', backspace);
    } else if (btn.classList.contains('percent')) {
        btn.addEventListener('click', handlePercent);
    } 
}

function handleKeyPress(e) {
    console.log(e.key, typeof e.key);
}

// second display
const lastCalculation = document.querySelector('h4');

// calculation functions
const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +b === 0 ? 'Cannot ÷ by 0' : +a / +b;




let firstNumber = "";
let secondNumber = "";
let operator;
let result = null;
let operatorSwitch = false;


function operate(n1, n2, operator) {
    switch (operator){
        case "+":
            result = add(n1, n2);
            break;
        case "-":
            result = subtract(n1, n2);
            break;
        case "*":
            result = multiply(n1, n2);
            break;
        case "/":
            result = divide(n1, n2);
            break;
        default:
            return null
    }
    if (typeof result === "number" && result.toString().length > 8) {
        result = result.toFixed(6);
    }
}

// display values are stored and managed here
let displayValue = '';

function populateDisplay(e) {
    let value = e.target;
    
    if (value.classList.contains('number')) {
        if (displayValue === result || result === 'Cannot ÷ by 0') {
            reset();
        }
        displayValue += value.textContent;
    }
    
    if (value.classList.contains('equals')) {
        displayValue = result;
    }
    
    display.textContent = displayValue;
}
    
// numbers are managed here for the calculation
function handleNumbers(e) {
    let input = e.target.textContent;
    if (displayValue === result || result === 'Cannot ÷ by 0') {
        reset();
    }
    if (operatorSwitch === true) {
        if (secondNumber.includes('.') && input === '.') return;
        secondNumber += input;
    } else {
        if (firstNumber.includes('.') && input === '.') return;
        firstNumber += input;
    }

    populateDisplay(e);

    console.log('first: ', firstNumber, 'second: ', secondNumber);
}       





// operators are managed here for the calculation
function handleOperator(e) {
    let target = e.target;

    operatorSwitch = true;
    
    if (operatorSwitch === true && firstNumber === "" && result) {
        firstNumber = result;
    } else if (firstNumber === '') {
        firstNumber = 0;
    }
    if (operator !== undefined) {
        handleOperatorResult();
    } 

    if (target.classList.contains('plus')) {
        operator = '+';
    } else if (target.classList.contains('minus')) {
        operator = '-';
    } else if (target.classList.contains('multiply')) {
        operator = '*';
    } else if (target.classList.contains('divide')) {
        operator = '/';
    } 
    

    populateDisplay(e);
    displayValue = '';
    display.textContent = '';
    lastCalculation.textContent = `${firstNumber} ${operator === '/' ? '÷' : operator === '*' ? '×' : operator} ${secondNumber}`;

    console.log('operator: ', operator);
    console.log('operatorSwitch: ', operatorSwitch);
    console.log('operator first: ', firstNumber, 'operator second: ', secondNumber);
    console.log('operator result: ', result);
}

function handlePercent() {
    if (!firstNumber || !secondNumber) return;
    result = firstNumber * secondNumber / 100;
    displayValue = result;
    secondNumber = result;
    display.textContent = result;
    lastCalculation.textContent = `${firstNumber} ${operator === '/' ? '÷' : operator === '*' ? '×' : operator} ${secondNumber}`;
}


// this function handles result when equal (=) is clicked
function handleResult() {
    if(firstNumber === '' || secondNumber === '') return;
    operate(firstNumber, secondNumber, operator);
    lastCalculation.textContent = `${firstNumber} ${operator === '/' ? '÷' : operator === '*' ? '×' : operator} ${secondNumber} =`;
    displayResult();
    // display.textContent = displayValue
    firstNumber = result !== null ? result.toString() : '0'; // Convert result to string if not null, otherwise use '0'
    secondNumber = "";
    operatorSwitch = false;

    console.log('= ', result);
}

// handles result when fN sN and Operator is stored and operator is clicked
function handleOperatorResult() {
    if (!secondNumber) return;
    operate(firstNumber, secondNumber, operator);
    // displayValue = result;
    displayResult();
    firstNumber = result;
    secondNumber = '';
}

// round off result
function displayResult() {
    displayValue = result;
    display.textContent = displayValue;
}

// clear display
const clearAll = document.querySelector('.clear');
clearAll.addEventListener('click', reset);
function reset() {
    firstNumber = '';
    secondNumber = '';
    operator;
    result = null;
    operatorSwitch = false;
    displayValue = '';
    display.textContent = '';
    lastCalculation.textContent = '';
}


// backspace buttons
function backspace() {
    if (displayValue === '') return;
    if (displayValue === result) {
        reset();
    }
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
        if (operatorSwitch) {
            secondNumber = displayValue;
        } else {
            firstNumber = displayValue;
        }
    }
    display.textContent = displayValue;
    
    console.log('firstN', firstNumber, '---', 'secondN', secondNumber);
    console.log(operator);
    console.log(operatorSwitch);
    console.log(displayValue);
}



