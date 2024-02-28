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

// keyboard events
window.addEventListener("keydown", (event) => {
    const key = event.key;
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
      
        switch (key) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case ".":
                handleKeyNumbers(key);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                handleKeyOperator(key);
                break;
            case "%":
                handlePercent(key);
                break;        
            case "Enter":
                handleResult();
                break;
            case "Escape":
                reset();
                break;
            case "Backspace":
                backspace();
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
  
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    },
    true,
  );




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
	if (typeof result === "number") {
		if (result.toString().length > 11) {
			if (result.toFixed(6).length <= 11) {
				result = result.toFixed(6);
			} else {
				result = result.toExponential(6);
			}
		}
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
		if (displayValue === '' && value.textContent === '.') {
			displayValue += '0.';
		} else {
			displayValue += value.textContent;
		}
	}
    
    if (value.classList.contains('equals')) {
        displayValue = result;
    }
    
	display.textContent = Number(displayValue).toLocaleString('en-US');
}

// numbers are managed here for the calculation
function handleNumbers(e) {
    let input = e.target.textContent;
    if (displayValue === result || result === 'Cannot ÷ by 0') {
        reset();
    }

    // limit inputs to 11 numbers
    if (displayValue.length < 11) {
        if (operatorSwitch === true) {
            if (secondNumber.includes('.') && input === '.') return;
            if (secondNumber === '' && input === '.') {
                secondNumber += '0' + input;
            } else {
                secondNumber += input;
            }
        } else {
            if (firstNumber.includes('.') && input === '.') return;
            if (firstNumber === '' && input === '.') {
                firstNumber += '0' + input;
            } else {
                firstNumber += input;
            }
        }
    }

    populateDisplay(e);

    // console.log('first: ', firstNumber, 'second: ', secondNumber);
}       


// number keyboard events
function handleKeyNumbers(key) {
    if (displayValue === result || result === 'Cannot ÷ by 0') {
        reset();
    }

    // limit the user input to 11 numbers
    if (displayValue.length < 11) {
        if (operatorSwitch === true) {
            if (secondNumber.includes('.') && key === '.') return;
            if (secondNumber === '' && key === '.'){
                secondNumber += '0.';
                displayValue += '0.';
            } else {
                secondNumber += key;
                displayValue += key;
            }
        } else {
            if (firstNumber.includes('.') && key === '.') return;
            if (firstNumber === '' && key === '.'){
                firstNumber += '0.';
                displayValue += '0.';
            } else {
                firstNumber += key;
                displayValue += key;
            }
        }
    }

	display.textContent = Number(displayValue).toLocaleString('en-US');
    // console.log('first: ', firstNumber, 'second: ', secondNumber);
}  




// operators are managed here for the calculation
function handleOperator(e) {
    let target = e.target;
    if (result === 'Cannot ÷ by 0') return;
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

    // console.log('operator: ', operator);
    // console.log('operatorSwitch: ', operatorSwitch);
    // console.log('operator first: ', firstNumber, 'operator second: ', secondNumber);
    // console.log('operator result: ', result);
}

// operator keyboard events
function handleKeyOperator(key) {
    operatorSwitch = true;
    if (result === 'Cannot ÷ by 0') return;
    
    if (operatorSwitch === true && firstNumber === "" && result) {
        firstNumber = result;
    } else if (firstNumber === '') {
        firstNumber = 0;
    }
    if (operator !== undefined) {
        handleOperatorResult();
    } 

    if (key === '+') {
        operator = '+';
    } else if (key === '-') {
        operator = '-';
    } else if (key === '*') {
        operator = '*';
    } else if (key === '/') {
        operator = '/';
    } 
    

    // populateDisplay(e);
    displayValue = '';
    display.textContent = '';
    lastCalculation.textContent = `${firstNumber} ${operator === '/' ? '÷' : operator === '*' ? '×' : operator} ${secondNumber}`;

    // console.log('operator: ', operator);
    // console.log('operatorSwitch: ', operatorSwitch);
    // console.log('operator first: ', firstNumber, 'operator second: ', secondNumber);
    // console.log('operator result: ', result);
}

function handlePercent() {
	if (!operator || !firstNumber) {
		firstNumber = '';
		secondNumber = '';
		operator = '';
		result = '0';
	} else if (!secondNumber && operator === '+' || !secondNumber && operator === '-') {
		secondNumber = firstNumber;
		result = firstNumber * secondNumber / 100;
	} else if (!secondNumber && operator === '/' || !secondNumber && operator === '*') {
		result = firstNumber / 100;
	} else {
		result = firstNumber * secondNumber / 100;
	}
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

    // console.log('= ', result);
}

// handles result when fN sN and Operator is stored and operator is clicked
function handleOperatorResult() {
    if (result === 'Cannot ÷ by 0') return;
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
    display.textContent = Number(displayValue).toLocaleString('en-US');
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
    display.textContent = '0';
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
    
    // console.log('firstN', firstNumber, '---', 'secondN', secondNumber);
    // console.log(operator);
    // console.log(operatorSwitch);
    // console.log(displayValue);
}



