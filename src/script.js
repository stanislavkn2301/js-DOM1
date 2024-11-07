document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    let currentInput = "0";
    let operator = null;
    let previousInput = null;

    document.querySelectorAll(".buttons button").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;
            console.log("Button clicked:", value);

            if (!isNaN(value) || value === ".") {
                handleNumber(value);
            } else if (value === "C") {
                clearDisplay();
            } else if (value === "⌫") {
                deleteLast();
            } else if (value === "CE") {
                clearEntry();
            } else if (value === "=") {
                calculate();
            } else if (value === "+/-") {
                toggleSign();
            } else if (value === "%") {
                calculatePercentage();
            } else {
                handleOperator(value);
            }
            updateDisplay();
        });
    });

    function handleNumber(value) {
        console.log("handleNumber called with:", value);
        if (currentInput === "0" && value !== ".") {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }

    function handleOperator(op) {
        console.log("handleOperator called with:", op);
        if (previousInput === null) {
            previousInput = currentInput;
        } else if (operator) {
            calculate();
        }
        operator = op;
        currentInput = "0";
    }

    function calculate() {
        console.log("calculate called");
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "×":
                result = prev * current;
                break;
            case "÷":
                result = current !== 0 ? prev / current : "Error";
                break;
            case "x²":
                result = prev * prev;
                break;
            case "√x":
                result = Math.sqrt(prev);
                break;
            case "1/x":
                result = prev !== 0 ? 1 / prev : "Error";
                break;
        }

        currentInput = result.toString();
        operator = null;
        previousInput = null;
    }

    function clearDisplay() {
        console.log("clearDisplay called");
        currentInput = "0";
        operator = null;
        previousInput = null;
    }

    function deleteLast() {
        console.log("deleteLast called");
        currentInput = currentInput.slice(0, -1) || "0";
    }

    function clearEntry() {
        console.log("clearEntry called");
        currentInput = "0";
    }

    function toggleSign() {
        console.log("toggleSign called");
        currentInput = (parseFloat(currentInput) * -1).toString();
    }

    function calculatePercentage() {
        console.log("calculatePercentage called");
        currentInput = (parseFloat(currentInput) / 100).toString();
    }

    function updateDisplay() {
        console.log("Display updated to:", currentInput);
        display.textContent = currentInput;
    }
});
