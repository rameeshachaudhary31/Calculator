let resultElement = document.getElementById("result");
let clearBtn = document.getElementById("clearBtn");
let delBtn = document.getElementById("delBtn");
let sqrtBtn = document.getElementById("sqrtBtn");
let divBtn = document.getElementById("divBtn");
let mulBtn = document.getElementById("mulBtn");
let subBtn = document.getElementById("subBtn");
let addBtn = document.getElementById("addBtn");
let deciBtn = document.getElementById("deciBtn");
let eqlBtn = document.getElementById("eqlBtn");
let numberBtns = document.querySelectorAll(".number");

// ------ variable initialize -------------
let result = "";
let operation = "";
let previousOperand = 0;

//  ------- Append number Function ----------------
let appendNumber = (number) => {
    if(number === "." && result.includes(".")) return;
    result += number;
    updateDisplay();
}

// ------- Update Display Function -----------
let updateDisplay = () => {
    if(operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else{
        resultElement.innerText = result;
    }
}

// ----- Seect Operator Function -----
let selectOperator = (operatorValue) => {
    if(result === "") return;
    if(operation !== "" && previousOperand !== "") {
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = result;
    result = "";
    updateDisplay();
}

// -------- Result Calculate Function -------
let calculateResult = () => {
    let evalutedResult;
    let prev = parseFloat(previousOperand);
    let current = parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case "+":
            evalutedResult = prev + current;
            break;
        case "-":
            evalutedResult = prev - current;
            break;
        case "*":
                evalutedResult = prev * current;
            break;       
        case "/":
                evalutedResult = prev / current;
                break;
        default:
            break;
    }
    result = evalutedResult.toString();
    operation = "";
    previousOperand = "";
}


// ------- Add event listner to number buttons ------------
numberBtns.forEach(button => {
    button.addEventListener("click", ()=> {
        appendNumber(button.innerText);
    })
});

// ------ Clear Display Function -----
let clearDisplay = () => {
    result = "";
    previousOperand = "";
    operation = "";
    updateDisplay();
}
// ---- Delete Last Digit Function ----
let deleteLastDigit = () => {
    if(operation !== "" && result === "") {
        operation = "";
        result = previousOperand;
        previousOperand = "";
        updateDisplay();
    }
    else {
    result = result.slice(0, -1);
    updateDisplay();
    }

};

deciBtn.addEventListener("click", () => appendNumber("."));
addBtn.addEventListener("click", () => selectOperator("+"));
subBtn.addEventListener("click", () => selectOperator("-"));
mulBtn.addEventListener("click", () => selectOperator("*"));
divBtn.addEventListener("click", () => selectOperator("/"));
eqlBtn.addEventListener("click", () => {
    if(result === "") return;
    calculateResult();
    updateDisplay();
})
clearBtn.addEventListener("click", clearDisplay);
delBtn.addEventListener("click", deleteLastDigit);
