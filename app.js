// Selectors
const date = document.querySelector("#date");
const startBtn = document.querySelector("#start");
const formCont = document.querySelector(".form-container");
const yesterdayBtn = document.querySelector("#yesterday");
const tomorrowBtn = document.querySelector("#tomorrow");
const plannerContainer = document.querySelector(".planner");

// VARIABLES
var stateTracker = 0; // on website open set to 0, yesterday subtracts 1, tomorrow adds 1

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

// DUPLICATE DELETE
function popFunc() {
  let plans; // plan array, where objects will be saved
  if (localStorage.getItem("plans") === null) {
    plans = [];
  } else {
    plans = JSON.parse(localStorage.getItem("plans")); // returns plans that were saved in local storage
  }
  plans.pop(); // pushes latest plan
  localStorage.setItem("plans", JSON.stringify(plans)); // saves latest plan to storage
}

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
  // Checks if there's an input for today so there won't be any duplicates
  if (plans.find((plans) => plans.date === today)) {
    alert("You already set up today");
    plans.pop();
  } else {
    plans.push(plan); // pushes latest plan
    localStorage.setItem("plans", JSON.stringify(plans)); // saves latest plan to storage
  }
}

function previousDay() {
  formCont.style.display = "none";
  plannerContainer.textContent = "";
  stateTracker = stateTracker - 1;
  console.log();

  if (stateTracker < -1) {
    oldDay = dd - Math.abs(stateTracker) + "." + mm + "." + yyyy;
    console.log(oldDay);
    date.innerText = oldDay;
    // Getting yesterday's data from local storage
    let planObject = JSON.parse(localStorage.getItem("plans"));

    // CHECK IF THERE's A VALUE if not throw error
    if (planObject.find((plans) => plans.date === oldDay)) {
      // If there's a value show it
      var yesterdaysPlan = planObject.find((plans) => plans.date === oldDay); //finds it through date
      console.log(yesterdaysPlan);
    } else {
      alert("No Plan for this day " + oldDay + "!");
    }
  } else {
    date.innerText = yesterday;
    // Getting yesterday's data from local storage
    let planObject = JSON.parse(localStorage.getItem("plans"));
    var yesterdaysPlan = planObject.find((plans) => plans.date === yesterday); //finds it through date
    console.log(yesterdaysPlan);
  }

  // create container where the text will come up
  const plans = document.createElement("div");
  plans.classList.add("saved-text-container");
  plannerContainer.appendChild(plans);

  // GOALS CONTAINER
  // Creates container to hold label text and data got from local storage
  const goalsContainer = document.createElement("div");
  goalsContainer.classList.add("form-output");
  plans.appendChild(goalsContainer);

  // creates h3 to hold "label" text
  const goalsText = document.createElement("h3");
  goalsText.classList.add("label-from-saved");
  goalsText.innerHTML = "Your Goals were: ";
  goalsContainer.appendChild(goalsText);

  // creates p to hold text input
  const goalsOutput = document.createElement("p");
  goalsOutput.classList.add("text-output");
  goalsOutput.innerHTML = yesterdaysPlan.goals;
  goalsContainer.appendChild(goalsOutput);
  // GOALS END

  // TARGETS CONTAINER
  // Creates container to hold label text and data got from local storage
  const targetContainer = document.createElement("div");
  targetContainer.classList.add("form-output");
  plans.appendChild(targetContainer);

  // creates h3 to hold "label" text
  const targetText = document.createElement("h3");
  targetText.classList.add("label-from-saved");
  targetText.innerHTML = "Your Targets were: ";
  targetContainer.appendChild(targetText);

  // creates p to hold text input
  const targetOutput = document.createElement("p");
  targetOutput.classList.add("text-output");
  targetOutput.innerHTML = yesterdaysPlan.targets;
  targetContainer.appendChild(targetOutput);
  // TARGETS END

  // SUCCESSES CONTAINER
  // Creates container to hold label text and data got from local storage
  const successContainer = document.createElement("div");
  successContainer.classList.add("form-output");
  plans.appendChild(successContainer);

  // creates h3 to hold "label" text
  const successText = document.createElement("h3");
  successText.classList.add("label-from-saved");
  successText.innerHTML = "Your Successes were: ";
  successContainer.appendChild(successText);

  // creates p to hold text input
  const successOutput = document.createElement("p");
  successOutput.classList.add("text-output");
  successOutput.innerHTML = yesterdaysPlan.successes;
  successContainer.appendChild(successOutput);
  // SUCCESS END

  // FAILURES CONTAINER
  // Creates container to hold label text and data got from local storage
  const failuresContainer = document.createElement("div");
  failuresContainer.classList.add("form-output");
  plans.appendChild(failuresContainer);

  // creates h3 to hold "label" text
  const failuresText = document.createElement("h3");
  failuresText.classList.add("label-from-saved");
  failuresText.innerHTML = "Your Failures were: ";
  failuresContainer.appendChild(failuresText);

  // creates p to hold text input
  const failuresOutput = document.createElement("p");
  failuresOutput.classList.add("text-output");
  failuresOutput.innerHTML = yesterdaysPlan.failures;
  failuresContainer.appendChild(failuresOutput);
  // FAILURES END

  //
}

function nextDay() {}
