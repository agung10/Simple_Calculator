// To access and store data on localStorage.
const CACHE_KEY = "calculation_history";

const clearButton = document.querySelector("#clear")

// Check the Storage feature in the browser.
function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

// To save calculation history data in localStorage
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            // JSON.parse() yang mana digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript.
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        
        // unshift(), fungsi ini digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index.
        historyData.unshift(data);
  
        if (historyData.length > 5) {
            // pop() di atas merupakan fungsi untuk menghapus nilai index terakhir pada array, sehingga ukuran array historyData tidak akan pernah lebih dari 5.
            historyData.pop();
        }
        
        // JSON.stringify() digunakan untuk mengubah objek JavaScript ke dalam bentuk String.
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

// To get data from localStorage.
function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

// To render calculation history data in HTML table.
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
  
  
    // always clear HTML content on historyList element so as not to display duplicate data
    historyList.innerHTML = "";
  
  
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
  
  
        historyList.appendChild(row);
    }
}

renderHistory();

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
  
    // the object to pass as the putHistory () function argument
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

// Clear
clearButton.addEventListener('click', function(event) {
    localStorage.removeItem(CACHE_KEY);
});