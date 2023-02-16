function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch and close modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form + fix 1
function launchModal() {
  modalBg.style.display = "block";
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closeModal);
}

function closeModal() {
  modalBg.style.display = "none";
}

// Form variables
const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationRadio = document.querySelectorAll('input[name="location"]');
const tos = document.getElementById("tos");
const news = document.getElementById("news");
const submitBtn = document.querySelector(".btn-submit");
const formOkMsg = document.querySelector(".formok_message");
const formOkBtn = document.querySelector(".formok_button");
const contentElement = document.querySelector(".content");

let today = (new Date()).toISOString().split('T')[0];
let inputIsOK = false;

// Base values
let valueFirstname = "";
let valueLastname = "";
let valueEmail = "";
let valuebirthdate = today;
let valueQuantity = 0;
let valueLocation = "";

// Regex
let emailRegex = /^([a-z A-Z 0-9\_.-]{2,30})@([a-z A-Z 0-9]{2,20})\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
let birthdateRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

// Object for data verification
const dataCheck = {
  firstname: false,
  lastname: false,
  email: false,
  birthdate: false,
  quantity: false,
  location: false,
  tos: false
};

// Tables used for listeners
const inputsCheck = [
  firstName,
  lastName,
  email,
  quantity,
  tos
];
let elementToCheck = "";

// Listener for every form component
for (input of inputsCheck) { input.addEventListener("change", inputCheck); }
// Listen on focusout because it trigger the check too often
birthdate.addEventListener("focusout", inputCheck);
// Listen when the user select an option
for (input of locationRadio) { input.addEventListener("change", checkLocation) };
submitBtn.addEventListener("click", submitCheck);

function inputCheck() {
  elementToCheck = this;
  keepInputs(elementToCheck);
}

// CSS change function
function invalidCSS(element) {
  const errorMsg = element.parentElement.querySelector(".errormsg");
  element.classList.add("input-nok");
  element.classList.remove("input-ok");
  errorMsg.classList.add("show-error");
}
function validCSS(element) {
  const errorMsg = element.parentElement.querySelector(".errormsg");
  element.classList.add("input-ok");
  element.classList.remove("input-nok");
  errorMsg.classList.remove("show-error");
}

// Function who check values and store them in "base values" variables
function keepInputs(elementToCheck) {
  console.log("Keepinput actual elementToCheck : " + elementToCheck);
  const nameType = elementToCheck.getAttribute("name");
  let errorText = elementToCheck.parentElement.querySelector(".errormsg");
  
  switch (nameType) {
    // Some validation tests are required
    case "firstname": {
      console.log("--- Firstname test ---");
      checkNames(elementToCheck, nameType, errorText);
      break;
    }
    case "lastname": {
      console.log("--- Lastname test ---");
      checkNames(elementToCheck, nameType, errorText);
      break;
    }
    case "email": {
      console.log("--- Email test ---");
      checkEmail(elementToCheck, errorText);
      break;
    }
    case "birthdate": {
      console.log("--- birthdate test ---");
      checkbirthdate(elementToCheck, errorText);
      break;
    }
    case "quantity": {
      console.log("--- Quantity test ---");
      checkQuantity(elementToCheck, errorText);
      break;
    }
    case "tos": {
      console.log("--- TOS test ---");
      checkTOS(elementToCheck, errorText);
      break;
    }
  }
}

// Values check functions
function checkBadValues(inputTest, errorText) {
  inputIsOK = false;
  let inputIsBad = !inputTest.checkValidity();
  if (inputIsBad) {
    inputIsOK = false;
    errorText.textContent = inputTest.validationMessage;
    invalidCSS(inputTest);
    console.log("Test NOK : Input is bad");
  } else {
    inputIsOK = true;
  }
}

function checkNames(inputTest, nameType, errorText) {
  let nameValue = inputTest.value;
  checkBadValues(inputTest, errorText);
  console.log("Input type : " + nameType);
  console.log("Input value : " + nameValue);
  if (!inputIsOK) {
    nameType === "firstname" 
      ? (dataCheck.firstname = false) && (valueFirstname = "")
      : (dataCheck.lastname = false) && (valueLastname = "");
  } else {
    nameType === "firstname" 
      ? (dataCheck.firstname = true) && (valueFirstname = nameValue)
      : (dataCheck.lastname = true) && (valueLastname = nameValue);
    validCSS(inputTest);
    console.log("Test OK");
  }
}

function checkEmail(inputTest, errorText) {
  let emailValue = inputTest.value;
  let testRegexOK = emailRegex.test(emailValue);
  checkBadValues(inputTest, errorText);
  console.log("Input value : " + emailValue);
  console.log("Is input OK ? " + inputIsOK);
  console.log("Regex result : " + testRegexOK);
  if (!inputIsOK) {
    dataCheck.email = false;
    valueEmail = "";
  } else if (!testRegexOK) {
    dataCheck.email = false;
    valueEmail = "";
    invalidCSS(inputTest);
    errorText.textContent = "Veuillez saisir une adresse e-mail valide.";
    console.log("Test NOK : Email regex failed");
  } else {
    dataCheck.email = true;
    valueEmail = emailValue;
    validCSS(inputTest);
    console.log("Test OK");
  }
}

function checkbirthdate(inputTest, errorText) {
  let birthdateValue = inputTest.value;
  let testRegexOK = birthdateRegex.test(birthdateValue);
  let isInTheFuture = birthdateValue > today;
  checkBadValues(inputTest, errorText);
  console.log("Input value : " + birthdateValue);
  console.log("Today date : " + today);
  console.log("Is input in the future ? " + isInTheFuture);
  console.log("Is input OK ? " + inputIsOK);
  console.log("Regex result : " + testRegexOK);
  if (!inputIsOK && inputTest.validity.rangeUnderflow) {
    dataCheck.birthdate = false;
    valuebirthdate = today;
    invalidCSS(inputTest);
    errorText.textContent = "Veuillez sélectionner une valeur postérieure ou égale à 01/01/1950.";
    console.log("Test NOK : Not in date range");
  } else if (!testRegexOK) {
    dataCheck.birthdate = false;
    valuebirthdate = today;
    invalidCSS(inputTest);
    errorText.textContent = "Veuillez saisir une date de naissance valide.";
    console.log("Test NOK : birthdate regex failed");
  } else if (testRegexOK && isInTheFuture) {
    dataCheck.birthdate = false;
    valuebirthdate = today;
    invalidCSS(inputTest);
    errorText.textContent = "Veuillez saisir une date de naissance inférieure à la date du jour.";
    console.log("Test NOK : birthdate is in the future");
  } else {
    dataCheck.birthdate = true;
    valuebirthdate = birthdateValue;
    validCSS(inputTest);
    console.log("Test OK");
  }
}

function checkQuantity(inputTest, errorText) {
  let quantityValue = inputTest.valueAsNumber;
  checkBadValues(inputTest, errorText);
  console.log("Input value : " + quantityValue);
  if (!inputIsOK) {
    dataCheck.quantity = false;
    valueQuantity = 0;
  } else {
    dataCheck.quantity = true;
    valueQuantity = quantityValue;
    validCSS(inputTest);
    console.log("Test OK");
  }
}

function checkTOS(inputTest, errorText) {
  if (inputTest.checked) {
    dataCheck.tos = true;
    validCSS(inputTest);
    console.log("Test OK");
  } else {
    dataCheck.tos = false;
    invalidCSS(inputTest);
    errorText.textContent = "Vous devez valider les conditions générales afin de vous inscrire.";
    console.log("Test NOK : TOS not checked");
  }
}

// Submit section
function submitCheck() {
  inputsCheck.forEach(input => keepInputs(input));
  keepInputs(birthdate);
  checkLocation(locationRadio);
}

function checkLocation() {
  const errorMsg = document.querySelector(".location-errormsg");
  console.log("--- Location test ---");
  for (radio of locationRadio) {
    if (radio.checked) {
      valueLocation = locationRadio.value;
      dataCheck.location = true;
      errorMsg.classList.remove("show-error");
      console.log("Test OK");
      break;
    } else {
      dataCheck.location = false;
      errorMsg.textContent = "Veuillez sélectionner une option.";
      errorMsg.classList.add("show-error");
      console.log("Test NOK : No location selected");
    }
  }
}

function validate() {
  // submitCheck;
}