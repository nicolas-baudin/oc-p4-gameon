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
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const radioList = document.querySelectorAll('input[name="location"]');
const radioArray = Array.from(radioList);
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
let valueBirthday = today;
let valueQuantity = 0;
let valueLocation = "";

// Regex
let emailRegex = /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
let birthdayRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|3[01])$/;

// Object for data verification
const dataCheck = {
  firstname: false,
  lastname: false,
  email: false,
  birthday: false,
  quantity: false,
  location: false,
  tos: false
};

// Tables used for listeners
let inputsListFocusout = [
  // firstName,
  // lastName,
  // email,
  birthdate,
  quantity,
  // tos,
  // news
];
let inputsListChange = [
  firstName,
  lastName,
  email,
  // birthdate,
  quantity,
  tos,
  news
];

// Listener for every form component
for (input of inputsListFocusout) {
  input.addEventListener("focusout", keepInputs);
}
for (input of inputsListChange) {
  input.addEventListener("change", keepInputs);
}
for (radio of radioArray) {
  radio.addEventListener("change", keepInputs);
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
function keepInputs() {
  console.log(this);
  const nameType = this.getAttribute("name");
  let errorText = this.parentElement.querySelector(".errormsg");
  
  switch (nameType) {
    // Some validation tests are required
    case "firstname": {
      console.log("--- Firstname test ---");
      checkNames(this, nameType, errorText);
      break;
    }
    case "lastname": {
      console.log("--- Lastname test ---");
      checkNames(this, nameType, errorText);
      break;
    }
    case "email": {
      console.log("--- Email test ---");
      checkEmail(this, errorText);
      break;
    }
    case "birthdate": {
      console.log("--- Birthday test ---");
      checkBirthday(this, errorText);
      break;
    }
    case "quantity": {
      console.log("--- Quantity test ---");
      checkQuantity(this, errorText);
      break;
    }
    case "tos": {
      console.log("--- TOS test ---");
      checkTOS(this, errorText);
      break;
    }
    // For those, we just have to change some values
    case "location": {
      console.log("--- Location test ---");
      checkLocation(this, errorText);
      break;
    }
    case "news": {
      console.log("--- Location test ---");
      checkNews(this, errorText);
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
    errorText.textContent = "Veuillez saisir une adresse e-mail valide.";
    console.log("Test NOK : Email regex failed");
  } else {
    dataCheck.email = true;
    valueEmail = emailValue;
    validCSS(inputTest);
    console.log("Test OK");
  }
}

function checkBirthday(inputTest, errorText) {
  let birthdayValue = inputTest.value;
  let testRegexOK = birthdayRegex.test(birthdayValue);
  let isInTheFuture = birthdayValue > today;
  checkBadValues(inputTest, errorText);
  console.log("Input value : " + birthdayValue);
  console.log("Today date : " + today);
  console.log("Is input in the future ? " + isInTheFuture);
  console.log("Is input OK ? " + inputIsOK);
  console.log("Regex result : " + testRegexOK);
  if (!inputIsOK && inputTest.validity.rangeUnderflow) {
    dataCheck.birthday = false;
    valueBirthday = today;
    invalidCSS(inputTest);
    errorText.textContent = "Veuillez sélectionner une valeur postérieure ou égale à 01/01/1950.";
    console.log("Test NOK : Not in date range");
  } else if (!testRegexOK) {
    dataCheck.birthday = false;
    valueBirthday = today;
    invalidCSS(inputTest);
    errorText.textContent = "Veuillez saisir une date de naissance valide.";
    console.log("Test NOK : Birthday regex failed");
  } else if (testRegexOK && isInTheFuture) {
    dataCheck.birthday = false;
    valueBirthday = today;
    invalidCSS(inputTest);
    errorText.textContent = "Veuillez saisir une date de naissance inférieure à la date du jour.";
    console.log("Test NOK : Birthday is in the future");
  } else {
    dataCheck.birthday = true;
    valueBirthday = birthdayValue;
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

function checkLocation(inputTest, errorText) {
  let locationValue = document.querySelector('input[name="location"]:checked').value;
  const errorMsg = document.querySelector(".location-errormsg");
  console.log("Input value : " + locationValue);
  dataCheck.location = true;
  valueLocation = locationValue;
  errorMsg.classList.remove("show-error");
  console.log("Test OK");
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

submitBtn.addEventListener("click", validate);

function validate() {

  if (!dataCheck.location) {
    const errorMsg = document.querySelector(".location-errormsg");
    errorMsg.textContent = "Vous devez choisir un endroit.";
    errorMsg.classList.add("show-error");
  }

  for (input of inputsListFocusout) {
    console.log(input);
    const nameType = input.getAttribute("name");
    console.log(nameType);
  }
}