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
let radioList = document.querySelectorAll(".formData:nth-child(7)>input");
let radioArray = Array.from(radioList);
const checkList = document.querySelectorAll(".formData:nth-child(8)>input");
const checkArray = Array.from(checkList);
const submitBtn = document.querySelector(".btn-submit");
const formOkMsg = document.querySelector(".formok_message");
const formOkBtn = document.querySelector(".formok_button");
const contentElement = document.querySelector(".content");

// Base values
let valueFirstname = "";
let valueLastname = "";
let valueEmail = "";
let valueBirthdate = new Date(0);
let valueQuantity = 0;
let valueLocation = "";
let valueRadio = 0;

// Regex
let emailRegex = /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
let birthdayRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
let inputIsOK = false;

// Object for data verification
const dataCheck = {
  firstname: false,
  lastname: false,
  email: false,
  birthday: false,
  quantity: false,
  location: false,
  checktos: false
};

// Tables used for listeners
let inputsListFocusout = [
  firstName,
  lastName,
  email,
  birthdate,
  quantity
];
let inputsListChange = [
  quantity,
  checkArray[0],
  checkArray[1]
];

// Listener for every form component
for (input of inputsListFocusout) {
  input.addEventListener("focusout", keepInputs);
}
for (input of inputsListChange) {
  input.addEventListener("change", keepInputs);
}
for (radio of radioArray) {
  radio.addEventListener("input", keepInputs);
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
    case "location": {
      console.log("--- Location test ---");
      checkLocation(this, errorText);
      break;
    }
    case "tos": {
      console.log("--- TOS test ---");
      checkTOS(this, errorText);
      break;
    }
  }
}

// Values check functions
function checkBadValues(inputTest, errorText) {
  inputIsOK = false;
  // let inputIsEmpty = inputTest.value == "";
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
  if (inputIsOK) {
    nameType === "firstname" 
      ? (dataCheck.firstname = true) && (valueFirstname = nameValue)
      : (dataCheck.lastname = true) && (valueLastname = nameValue);
    validCSS(inputTest);
    console.log("Test OK");
  } else {
    nameType === "firstname" 
      ? (dataCheck.firstname = false) && (valueFirstname = "")
      : (dataCheck.lastname = false) && (valueLastname = "");
  }
}

function checkEmail(inputTest, errorText) {
  let emailValue = inputTest.value;
  let testRegexOK = emailRegex.test(emailValue);
  checkBadValues(inputTest, errorText);
  console.log("Input value : " + emailValue);
  console.log("Is input OK ? " + inputIsOK);
  console.log("Regex result : " + testRegexOK);
  if (inputIsOK && testRegexOK) {
    dataCheck.email = true;
    valueEmail = emailValue;
    validCSS(inputTest);
    console.log("Test OK");
  } else if (!inputIsOK) {
    dataCheck.email = false;
    valueEmail = "";
  } else {
    dataCheck.email = false;
    valueEmail = "";
    errorText.textContent = "Veuillez saisir une adresse e-mail valide.";
    console.log("Test NOK : Email regex failed");
  }
}

function checkBirthday() {
  // if (format date de naissance != bdayRegex || année indiquée > année actuelle) {
  //   - Message d'erreur = "Veuillez entrer un email valide"
  //   - Appliquer class display block au message d'erreur enfant
  // }
}

function checkQuantity(inputTest, errorText) {
  let quantityValue = inputTest.valueAsNumber;
  checkBadValues(inputTest, errorText);
  console.log("Input value : " + quantityValue);
  if (inputIsOK) {
    dataCheck.quantity = true;
    valueQuantity = quantityValue;
    validCSS(inputTest);
    console.log("Test OK");
  } else {
    dataCheck.quantity = false;
    valueQuantity = 0;
  }
}

function checkLocation() {
  // if (locationInput == "") {
  //   - Message d'erreur = "Veuillez indiquer à quel tournoi vous souhaitez participer"
  //   - Appliquer class display block au message d'erreur enfant
  // }
}

function checkTOS() {
  // if (TOS décoché) {
  //   - Message d'erreur = "Vous devez vérifier que vous acceptez les termes et conditions"
  //   - Appliquer class display block au message d'erreur enfant
  // }
}

function validate() {
  // console.log(inputsList);
}
