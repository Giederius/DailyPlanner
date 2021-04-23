// Selectors
const date = document.querySelector("#date");
const startBtn = document.querySelector("#start");
const formCont = document.querySelector(".form-container");

// Selectors - areatext fields
const goalsInput = document.querySelector("#goal-input");
const targetInput = document.querySelector("#target-input");
const successInput = document.querySelector("#success-input");
const failureInput = document.querySelector("#failure-input");
const submitBtn = document.querySelector("#submit-button");

// Event Listeners
submitBtn.addEventListener("click", addPlan);

// startBtn.addEventListener("click", () => {
//   formCont.style.display = "flex";
//   startBtn.style.display = "none";
// });

// Functions

// Object and constructor creation
function Plan(planDate, planGoals, planTargets, planSuccesses, planFailures) {
  this.date = planDate;
  this.goals = planGoals;
  this.targets = planTargets;
  this.successes = planSuccesses;
  this.failures = planFailures;
}

// Save plan
function addPlan(event) {
  event.preventDefault();
  var inputPlan = new Plan(
    today,
    goalsInput.value,
    targetInput.value,
    successInput.value,
    failureInput.value
  );
  console.log(inputPlan);
  saveLocal(inputPlan);
}

// Date
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = dd + "." + mm + "." + yyyy;
date.innerText = today; // to display the date
// Date ends

// Saving to LOCAL STORAGE
function saveLocal(plan) {
  // Checking if there's anything in here??
  let plans; // plan array, where objects will be saved
  if (localStorage.getItem("plans") === null) {
    plans = [];
  } else {
    plans = JSON.parse(localStorage.getItem("plans")); // returns plans that were saved in local storage
  }
  plans.push(plan); // pushes latest plan
  localStorage.setItem("plans", JSON.stringify(plans)); // saves latest plan to storage
}

function previousDay() {}

function nextDay() {}
