// Selectors
const date = document.querySelector("#date");
var plan = { goals: "", targets: "", successes: "", failures: "" }; //creates a new object
const startBtn = document.querySelector("#start");
const formCont = document.querySelector(".form-container");
// Event Listeners
startBtn.addEventListener("click", () => {
  formCont.style.display = "none";
});
// Functions

// Date
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = dd + "." + mm + "." + yyyy;
date.innerText = today;
// Date ends

// LOCAL STORAGE

function previousDay() {}

function nextDay() {}

function localStorage(plan) {}
