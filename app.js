// Selectors
const date = document.querySelector("#date");
const startBtn = document.querySelector("#start");
const formCont = document.querySelector(".form-container");
const yesterdayBtn = document.querySelector("#yesterday");
const tomorrowBtn = document.querySelector("#tomorrow");

const plannerContainer = document.querySelector(".planner");

// Selectors - areatext fields
const goalsInput = document.querySelector("#goal-input");
const targetInput = document.querySelector("#target-input");
const successInput = document.querySelector("#success-input");
const failureInput = document.querySelector("#failure-input");
const submitBtn = document.querySelector("#submit-button");

// Event Listeners
submitBtn.addEventListener("click", addPlan);
yesterdayBtn.addEventListener("click", previousDay);
tomorrowBtn.addEventListener("click", nextDay);

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
var yesterday = dd - 1 + "." + mm + "." + yyyy;
var tomorrow = dd + 1 + "." + mm + "." + yyyy;
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

function previousDay() {
  formCont.style.display = "none";
  // CHANGE THE DATE!

  // create container where the text will come up
  const plans = document.createElement("div");
  plans.classList.add("saved-text-container");
  plannerContainer.appendChild(plans);

  // Creates container to hold label text and data got from local storage
  const innerContainer = document.createElement("div");
  innerContainer.classList.add("form-output");
  plans.appendChild(innerContainer);

  // creates h3 to hold "label" text
  const labelText = document.createElement("h3");
  labelText.classList.add("label-from-saved");
  labelText.innerHTML = "Your goals were: ";
  innerContainer.appendChild(labelText);
}

function nextDay() {}
