const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// calculate first and second value depending on operator
const calculate={
    '/' : (firstNumber,secondNumber) => firstNumber / secondNumber,
  
    '*' : (firstNumber,secondNumber) => firstNumber * secondNumber,
  
    '+' : (firstNumber,secondNumber) => firstNumber + secondNumber,
  
    '-' : (firstNumber,secondNumber) => firstNumber - secondNumber,
  
    '=' : (firstNumber,secondNumber) => secondNumber,
};  

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  // replace current value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // if the current value is 0, replace it, if not add numbers
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
    // if operator pressed, don't add decimal
    if(awaitingNextValue) return;
  // if no decimal add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}


function useOperator(operator) {
  const currentVal = Number(calculatorDisplay.textContent);
  // preventing mutiple operators
  if(operatorValue && awaitingNextValue){
    operatorValue = operator;
    return;
  };
  // Assiign first value if no value
  if (!firstValue) {
    firstValue = currentVal;
  } else {
    const calculation = calculate[operatorValue](firstValue,currentVal);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;

}

// Reset Display

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Add Event Listeners for numbers, operators, decimal buttons

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
      inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains("operator")) {
      inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains("decimal")) {
      inputBtn.addEventListener("click", () => addDecimal());
    }
});
  

// Adding event listener
clearBtn.addEventListener("click", () => resetAll());
