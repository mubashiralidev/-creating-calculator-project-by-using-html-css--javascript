const display = document.getElementById("display");

let currentInput = "0";
let operator = "";
let previousInput = "";

// Update display
function updateDisplay() {
    display.textContent = currentInput;
}

// Clear function
document.querySelector(".clear").addEventListener("click", () => {
    currentInput = "0";
    previousInput = "";
    operator = "";
    updateDisplay();
});

// Delete function
document.querySelector(".del").addEventListener("click", () => {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    updateDisplay();
});

// Number & dot buttons
document.querySelectorAll(".buttons button").forEach(btn => {
    btn.addEventListener("click", function () {
        let value = this.textContent;

        if (
            this.classList.contains("clear") ||
            this.classList.contains("del") ||
            this.classList.contains("operator") ||
            this.classList.contains("equal")
        ) return;

        if (currentInput === "0") currentInput = value;
        else currentInput += value;

        updateDisplay();
    });
});

// Operator buttons
document.querySelectorAll(".operator").forEach(opBtn => {
    opBtn.addEventListener("click", function () {
        if (currentInput === "0" && previousInput === "") return;
        if (operator !== "") calculate();

        previousInput = currentInput;
        operator = this.textContent;
        currentInput = "0";
    });
});

// Equal button
document.querySelector(".equal").addEventListener("click", () => {
    calculate();
});

// Calculation logic
function calculate() {
    if (operator === "") return;

    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);

    if (operator === "+") currentInput = (prev + curr).toString();
    if (operator === "-") currentInput = (prev - curr).toString();
    if (operator === "*") currentInput = (prev * curr).toString();
    if (operator === "/") currentInput = curr === 0 ? "Error" : (prev / curr).toString();
    if (operator === "%") currentInput = (prev % curr).toString();

    operator = "";
    previousInput = "";
    updateDisplay();
}

updateDisplay();
