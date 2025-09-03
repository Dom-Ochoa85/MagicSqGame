const container = document.getElementById("magic-square-container");
const generateButton = document.getElementById("generate");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

let currentSize = 3;


generateButton.addEventListener("click", () => {
    currentSize = parseInt(document.getElementById("size").value);
    if (currentSize < 3 || currentSize > 9) {
        alert("Please enter a size between 3 and 9.");
        return;
    }

    container.innerHTML = ""; 
    const table = document.createElement("table");
    table.id = "magic-square";

    for (let r = 0; r < currentSize; r++) {
        const tr = document.createElement("tr");
        for (let c = 0; c < currentSize; c++) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.id = `cell-${r}-${c}`;
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    container.appendChild(table);
    result.textContent = "";
});

checkButton.addEventListener("click", () => {
    const n = currentSize;
    const cells = [];

    for (let r = 0; r < n; r++) {
        const row = [];
        for (let c = 0; c < n; c++) {
            const val = parseInt(document.getElementById(`cell-${r}-${c}`).value);
            if (isNaN(val)) {
                result.textContent = "❌ Fill all cells with numbers!";
                return;
            }
            row.push(val);
        }
        cells.push(row);
    }

    const magicSum = (n * (n * n + 1)) / 2;
    let correct = true;

    for (let r = 0; r < n; r++) {
        const sum = cells[r].reduce((a, b) => a + b, 0);
        if (sum !== magicSum) correct = false;
    }

    for (let c = 0; c < n; c++) {
        let sum = 0;
        for (let r = 0; r < n; r++) sum += cells[r][c];
        if (sum !== magicSum) correct = false;
    }

    let diag1 = 0, diag2 = 0;
    for (let i = 0; i < n; i++) {
        diag1 += cells[i][i];
        diag2 += cells[i][n - 1 - i];
    }
    if (diag1 !== magicSum || diag2 !== magicSum) correct = false;

    result.textContent = correct
        ? "🎉 Correct! You solved the magic square!"
        : "❌ Not correct, try again!";
});
 