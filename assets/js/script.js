// Make Object
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

// General functions of the calculator

// Update
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}
  
// Delete
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

// Input
function inputDigit(digit) {
    if(calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

//Function for specifying an operator
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
 
        // reset the display number value so that the next button starts from the first number again
        calculator.displayNumber = '0';
    } else {
        alert('The operator has been assigned')
    }
}

// Do calculations
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("You haven't set an operator");
        return;
    }
  
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }
  
    calculator.displayNumber = result;
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
 
        // Get the clicked element object
        const target = event.target;
  
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
  
        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
  
        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
  
        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }
  
        inputDigit(target.innerText);
        updateDisplay()
    });
}