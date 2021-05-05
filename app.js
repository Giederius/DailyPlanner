// VARIABLES
var stateTracker = 0; // on website open set to 0, yesterday subtracts 1, tomorrow adds 1
var editStateTracker = 0; // to edit the inputs it has to be one. which means that the edit button was pressed

// Selectors - text elements
const date = document.querySelector("#date");
const qoute = document.querySelector("#qoute-text");
const yesterdayText = document.querySelector("#yesterday-text");

// Selectors - containers
const formCont = document.querySelector(".form-container");
const plannerContainer = document.querySelector(".planner");

// Selectors - buttons
const startBtn = document.querySelector("#start");
const editBtn = document.querySelector("#edit");
const saveEditBtn = document.querySelector("#save");
const yesterdayBtn = document.querySelector("#yesterday");
const tomorrowBtn = document.querySelector("#tomorrow");
const submitBtn = document.querySelector("#submit-button");

// Selectors - areatext fields
const goalsInput = document.querySelector("#goal-input");
const targetInput = document.querySelector("#target-input");
const successInput = document.querySelector("#success-input");
const failureInput = document.querySelector("#failure-input");

const editedPlanInput = document.getElementsByName("edit-input");

// SELECTORS END

// Event Listeners
submitBtn.addEventListener("click", addPlan);
yesterdayBtn.addEventListener("click", previousDay);
tomorrowBtn.addEventListener("click", nextDay);
editBtn.addEventListener("click", editPlan);
saveEditBtn.addEventListener("click", saveEditedPlan);

// startBtn.addEventListener("click", () => {
//   formCont.style.display = "flex";
//   startBtn.style.display = "none";
// });

// EVENT LISTENERS END

// Functions

// Date
function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return day + "." + month + "." + year;
}

var today = new Date();
today = getFormattedDate(today).toString();
var tomorrow = new Date();
var yesterday = new Date();
tomorrow.setDate(tomorrow.getDay() + 3).toString();
tomorrow = getFormattedDate(tomorrow);
yesterday.setDate(yesterday.getDay() + 1).toString();
yesterday = getFormattedDate(yesterday);
date.innerText = today; // to display the date
// Date ends

// QOUTE API START
function getQoute() {
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      var randNumber = Math.floor(Math.random() * (1644 - 1)) + 1;

      if (data[randNumber].author == null) {
        var savedQoute = '"' + data[randNumber].text + '"';
        qoute.innerText = savedQoute;
      } else {
        var savedQoute =
          '"' + data[randNumber].text + '"' + " " + data[randNumber].author;
        qoute.innerText = savedQoute;
      }
    });
}

getQoute();

// QOUTE API END

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
class Plan {
  constructor(planDate, planGoals, planTargets, planSuccesses, planFailures) {
    this.date = planDate;
    this.goals = planGoals;
    this.targets = planTargets;
    this.successes = planSuccesses;
    this.failures = planFailures;
  }
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

function editPlan() {
  editStateTracker = 1; // to track that the edit button was pressed
  plannerContainer.textContent = "";
  // gets the plan
  let planObject = JSON.parse(localStorage.getItem("plans"));

  // gets the index
  if (stateTracker == 0) {
    var plansIndex = planObject.findIndex((plans) => plans.date === today);
  } else if (stateTracker == -1) {
    var plansIndex = planObject.findIndex((plans) => plans.date === yesterday);
  } else if (stateTracker < -1) {
    var oldDay = new Date();
    oldDay.setDate(oldDay.getDay() - Math.abs(stateTracker + 2)).toString();
    oldDay = getFormattedDate(oldDay);

    var plansIndex = planObject.findIndex((plans) => plans.date === oldDay);
  }

  editElementCreation(planObject, plansIndex);
}

function saveEditedPlan(event) {
  event.preventDefault();
  if (stateTracker == 0) {
    editDay = today;
  } else if (stateTracker == -1) {
    editDay = yesterday;
  } else if (stateTracker < -1) {
    editDay = oldDay;
  }

  goalsInput.value = editedPlanInput[0].value;
  targetInput.value = editedPlanInput[1].value;
  successInput.value = editedPlanInput[2].value;
  failureInput.value = editedPlanInput[3].value;

  if (editStateTracker === 1) {
    var editedPlan = new Plan(
      editDay,
      goalsInput.value,
      targetInput.value,
      successInput.value,
      failureInput.value
    );

    planObject = JSON.parse(localStorage.getItem("plans"));
    // gets the index
    if (stateTracker == 0) {
      var plansIndex = planObject.findIndex((plans) => plans.date === today);
    } else if (stateTracker == -1) {
      var plansIndex = planObject.findIndex(
        (plans) => plans.date === yesterday
      );
    } else if (stateTracker < -1) {
      var plansIndex = planObject.findIndex((plans) => plans.date === oldDay);
    }
    planObject.splice(plansIndex, 1, editedPlan); // to remove the edited element and re-enter it
    localStorage.setItem("plans", JSON.stringify(planObject));
    console.log(planObject);
    console.log(editedPlan);
    console.log(plansIndex);
  } else {
    alert("You need to edit first to save the edited plan!");
  }
}

function previousDay() {
  formCont.style.display = "none";
  plannerContainer.textContent = "";
  stateTracker = stateTracker - 1;
  yesterdayText.innerText = "PREVIOUS DAY";
  // yesterday = "0" + yesterday;
  if (stateTracker < -1) {
    var oldDay = new Date();
    oldDay.setDate(oldDay.getDay() - Math.abs(stateTracker + 2)).toString();
    //  dd - Math.abs(stateTracker) + "." + mm + "." + yyyy;
    oldDay = getFormattedDate(oldDay);
    date.innerText = oldDay;

    // Getting yesterday's data from local storage
    let planObject = JSON.parse(localStorage.getItem("plans"));
    yesterdayText.innerText = "PREVIOUS DAY";
    // CHECK IF THERE's A VALUE if not throw error
    if (planObject.find((plans) => plans.date === oldDay)) {
      // If there's a value show it
      var yesterdaysPlan = planObject.find((plans) => plans.date === oldDay); //finds it through date
      // finding index
      var plansIndex = planObject.findIndex((plans) => plans.date === oldDay);
      elementCreation(yesterdaysPlan);
    } else {
      alert("No Plan for this day " + oldDay + "!");
      // Stop the date going back and don't make the elements disappear
    }
  } else {
    date.innerText = yesterday;
    // Getting yesterday's data from local storage
    let planObject = JSON.parse(localStorage.getItem("plans"));
    console.log(planObject);
    var yesterdaysPlan = planObject.find((plans) => plans.date === yesterday); //finds it through date
    var plansIndex = planObject.findIndex((plans) => plans.date === yesterday); // finds index
    console.log(yesterdaysPlan);
    elementCreation(yesterdaysPlan);
  }
}

function nextDay() {}

function elementCreation(planToCreate) {
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
  goalsOutput.innerHTML = planToCreate.goals;
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
  targetOutput.innerHTML = planToCreate.targets;
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
  successOutput.innerHTML = planToCreate.successes;
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
  failuresOutput.innerHTML = planToCreate.failures;
  failuresContainer.appendChild(failuresOutput);
  // FAILURES END
}

function editElementCreation(planToCreate, plansIndex) {
  // creates form
  const forma = document.createElement("form");
  plannerContainer.appendChild(forma);

  // create container where the text will come up
  const plans = document.createElement("div");
  plans.classList.add("form-container");
  forma.appendChild(plans);

  // GOALS CONTAINER
  // Creates container to hold label text and data got from local storage
  const goalsContainer = document.createElement("div");
  goalsContainer.classList.add("form-input");
  plans.appendChild(goalsContainer);

  // creates h3 to hold "label" text
  const goalsText = document.createElement("h3");
  goalsText.classList.add("label-from-saved");
  goalsText.innerHTML = "Your Goals were: ";
  goalsContainer.appendChild(goalsText);

  // creates textarea to hold text input
  const goalsOutput = document.createElement("textarea");
  goalsOutput.name = "edit-input";
  goalsOutput.classList.add("text-output");
  goalsOutput.value = planToCreate[plansIndex].goals;
  goalsOutput.setAttribute("cols", "60");
  goalsOutput.setAttribute("rows", "5");
  goalsContainer.appendChild(goalsOutput);
  // GOALS END

  // TARGETS CONTAINER
  // Creates container to hold label text and data got from local storage
  const targetContainer = document.createElement("div");
  targetContainer.classList.add("form-input");
  plans.appendChild(targetContainer);

  // creates h3 to hold "label" text
  const targetText = document.createElement("h3");
  targetText.classList.add("label-from-saved");
  targetText.innerHTML = "Your Targets were: ";
  targetContainer.appendChild(targetText);

  // creates p to hold text input
  const targetOutput = document.createElement("textarea");
  targetOutput.id = "target-input";
  targetOutput.name = "edit-input";
  targetOutput.classList.add("text-output");
  targetOutput.value = planToCreate[plansIndex].targets;
  targetOutput.setAttribute("cols", "60");
  targetOutput.setAttribute("rows", "5");
  targetContainer.appendChild(targetOutput);
  // TARGETS END

  // SUCCESSES CONTAINER
  // Creates container to hold label text and data got from local storage
  const successContainer = document.createElement("div");
  successContainer.classList.add("form-input");
  plans.appendChild(successContainer);

  // creates h3 to hold "label" text
  const successText = document.createElement("h3");
  successText.classList.add("label-from-saved");
  successText.innerHTML = "Your Successes were: ";
  successContainer.appendChild(successText);

  // creates p to hold text input
  const successOutput = document.createElement("textarea");
  successOutput.id = "success-input";
  successOutput.name = "edit-input";
  successOutput.classList.add("text-output");
  successOutput.value = planToCreate[plansIndex].successes;
  successOutput.setAttribute("cols", "60");
  successOutput.setAttribute("rows", "5");
  successContainer.appendChild(successOutput);
  // SUCCESS END

  // FAILURES CONTAINER
  // Creates container to hold label text and data got from local storage
  const failuresContainer = document.createElement("div");
  failuresContainer.classList.add("form-input");
  plans.appendChild(failuresContainer);

  // creates h3 to hold "label" text
  const failuresText = document.createElement("h3");
  failuresText.classList.add("label-from-saved");
  failuresText.innerHTML = "Your Failures were: ";
  failuresContainer.appendChild(failuresText);

  // creates p to hold text input
  const failuresOutput = document.createElement("textarea");
  failuresOutput.id = "failure-input";
  failuresOutput.name = "edit-input";
  failuresOutput.classList.add("text-output");
  failuresOutput.value = planToCreate[plansIndex].failures;
  failuresOutput.setAttribute("cols", "60");
  failuresOutput.setAttribute("rows", "5");
  failuresContainer.appendChild(failuresOutput);
  // FAILURES END
}
