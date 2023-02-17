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
let valueTOS = "";
let valueNews = "";

// Regex
let emailRegex = /^[a-z0-9]+([\.-]?[a-z0-9]+)*@\w+[a-z0-9]+([\.-]?[a-z0-9]+)*(\.[a-z]{2,3})+$/;
let birthdateRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
let nameRegex = /^[A-Z]{1}(?!.*(.).{0}}\1)[^0-9_!¡?÷?¿\\+=@#$%\^&*(){}|~<>;:[\]"\/]{1,}[^0-9_!¡?÷?¿\\+=@#$%\^&*(){}|~<>;:[\]"\/\-_',]{1}$/;

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
  tos,
  news
];

let elementToCheck = "";

// Listener for every form component
for (input of inputsCheck) { input.addEventListener("change", inputCheck); }
// Listen on focusout because it trigger the check too often
birthdate.addEventListener("focusout", inputCheck);
// Listen when the user select an option
for (input of locationRadio) { input.addEventListener("change", inputCheck) };

submitBtn.addEventListener("click", validate);

function inputCheck() {
  elementToCheck = this;
  keepInputs(elementToCheck);
}

// CSS change function
function invalidCSS(elementToCheck) {
  const errorText = elementToCheck.parentElement.querySelector(".errormsg");
  elementToCheck.classList.add("input-nok");
  elementToCheck.classList.remove("input-ok");
  errorText.classList.add("show-error");
}
function validCSS(elementToCheck) {
  const errorText = elementToCheck.parentElement.querySelector(".errormsg");
  elementToCheck.classList.add("input-ok");
  elementToCheck.classList.remove("input-nok");
  errorText.classList.remove("show-error");
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
      console.log("--- Birthdate test ---");
      checkbirthdate(elementToCheck, errorText);
      break;
    }
    case "quantity": {
      console.log("--- Quantity test ---");
      checkQuantity(elementToCheck, errorText);
      break;
    }
    case "location": {
      console.log("--- Location test ---");
      checkLocation(elementToCheck);
      break;
    }
    case "tos": {
      console.log("--- TOS test ---");
      checkTOS(elementToCheck);
      break;
    }
    case "news": {
      console.log("--- Newsletter test ---");
      checkNews(elementToCheck);
      break;
    }
  }
}

// Values check functions
function checkBadValues(elementToCheck, errorText) {
  inputIsOK = false;
  let inputIsBad = !elementToCheck.checkValidity();
  if (inputIsBad) {
    inputIsOK = false;
    errorText.textContent = elementToCheck.validationMessage;
    invalidCSS(elementToCheck);
    console.log("Test NOK : Input is bad");
  } else {
    inputIsOK = true;
  }
}

function checkNames(elementToCheck, nameType, errorText) {
  let nameValue = elementToCheck.value;
  let testRegexOK = nameRegex.test(nameValue);
  checkBadValues(elementToCheck, errorText);
  console.log("Input type : " + nameType);
  console.log("Input value : " + nameValue);
  if (!inputIsOK) {
    nameType === "firstname"?
    (dataCheck.firstname = false) && (valueFirstname = ""):
    (dataCheck.lastname = false) && (valueLastname = "");
  } else if (!testRegexOK) {
    nameType === "firstname"?
    (dataCheck.firstname = false) && (valueFirstname = ""):
    (dataCheck.lastname = false) && (valueLastname = "");
    invalidCSS(elementToCheck);
    errorText.textContent = `Veuillez saisir un ${nameType==="firstname"?"prénom":"nom"} valide.`;
    console.log(`Test NOK : ${elementToCheck.name} Regex failed`);
  } else {
    nameType === "firstname" 
      ? (dataCheck.firstname = true) && (valueFirstname = nameValue)
      : (dataCheck.lastname = true) && (valueLastname = nameValue);
    validCSS(elementToCheck);
    console.log("Test OK");
  }
}

function checkEmail(elementToCheck, errorText) {
  let emailValue = elementToCheck.value;
  let testRegexOK = emailRegex.test(emailValue);
  checkBadValues(elementToCheck, errorText);
  console.log("Input value : " + emailValue);
  console.log("Is input OK ? " + inputIsOK);
  console.log("Regex result : " + testRegexOK);
  if (!inputIsOK) {
    dataCheck.email = false;
    valueEmail = "";
  } else if (!testRegexOK) {
    dataCheck.email = false;
    valueEmail = "";
    invalidCSS(elementToCheck);
    errorText.textContent = "Veuillez saisir une adresse e-mail valide.";
    console.log("Test NOK : Email regex failed");
  } else {
    dataCheck.email = true;
    valueEmail = emailValue;
    validCSS(elementToCheck);
    console.log("Test OK");
  }
}

function checkbirthdate(elementToCheck, errorText) {
  let birthdateValue = elementToCheck.value;
  let testRegexOK = birthdateRegex.test(birthdateValue);
  let isInTheFuture = birthdateValue > today;
  checkBadValues(elementToCheck, errorText);
  console.log("Input value : " + birthdateValue);
  console.log("Today date : " + today);
  console.log("Is input in the future ? " + isInTheFuture);
  console.log("Is input OK ? " + inputIsOK);
  console.log("Regex result : " + testRegexOK);
  if (!inputIsOK && elementToCheck.validity.rangeUnderflow) {
    dataCheck.birthdate = false;
    valuebirthdate = today;
    invalidCSS(elementToCheck);
    errorText.textContent = "Veuillez sélectionner une valeur postérieure ou égale à 01/01/1950.";
    console.log("Test NOK : Not in date range");
  } else if (!testRegexOK) {
    dataCheck.birthdate = false;
    valuebirthdate = today;
    invalidCSS(elementToCheck);
    errorText.textContent = "Veuillez saisir une date de naissance valide.";
    console.log("Test NOK : birthdate regex failed");
  } else if (testRegexOK && isInTheFuture) {
    dataCheck.birthdate = false;
    valuebirthdate = today;
    invalidCSS(elementToCheck);
    errorText.textContent = "Veuillez saisir une date de naissance inférieure à la date du jour.";
    console.log("Test NOK : birthdate is in the future");
  } else {
    dataCheck.birthdate = true;
    valuebirthdate = birthdateValue;
    validCSS(elementToCheck);
    console.log("Test OK");
  }
}

function checkQuantity(elementToCheck, errorText) {
  let quantityValue = elementToCheck.valueAsNumber;
  checkBadValues(elementToCheck, errorText);
  console.log("Input value : " + quantityValue);
  if (!inputIsOK) {
    dataCheck.quantity = false;
    valueQuantity = 0;
  } else {
    dataCheck.quantity = true;
    valueQuantity = quantityValue;
    validCSS(elementToCheck);
    console.log("Test OK");
  }
}

function checkLocation(elementToCheck) {
  const errorLocationText = document.querySelector(".location-errormsg");
  dataCheck.location = true;
  valueLocation = elementToCheck.value;
  console.log("Current location : " + valueLocation)
  errorLocationText.classList.remove("show-error");
  console.log("Test OK");
}

function locationFalse() {
  const errorLocationText = document.querySelector(".location-errormsg");
  errorLocationText.textContent = "Veuillez sélectionner une option.";
  errorLocationText.classList.add("show-error");
  console.log("Test NOK : No location selected");
}

function checkTOS(elementToCheck) {
  const errorText = elementToCheck.parentElement.querySelector(".errormsg");
  if (elementToCheck.checked) {
    dataCheck.tos = true;
    valueTOS = "Oui";
    validCSS(elementToCheck);
    console.log("Test OK");
  } else {
    dataCheck.tos = false;
    valueTOS = "";
    invalidCSS(elementToCheck);
    errorText.textContent = "Vous devez valider les conditions générales afin de vous inscrire.";
    console.log("Test NOK : TOS not checked");
  }
}

function checkNews(elementToCheck) {
  if (elementToCheck.checked) {
    valueNews = "Oui";
    console.log("News YES");
  } else {
    valueNews = "";
    console.log("News NO");
  }
}

// Submit section
function submitCheck() {
  inputsCheck.forEach(input => keepInputs(input));
  keepInputs(birthdate);
  if (dataCheck.location == false) {
    console.log("--- Submit Location Check ---");
    locationFalse();
  };
}
class storeValues {
  constructor (
    firstname,
    lastname,
    email,
    birthdate,
    quantity,
    location,
    tos,
    news
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthdate = birthdate;
    this.quantity = quantity;
    this.location = location;
    this.tos = tos;
    this.news = news;
  }
};

function validate() {
  submitCheck();
  let allTrue = Object.keys(dataCheck).every(function(k){ return dataCheck[k] });
  if (allTrue) {
    const dataTab = new storeValues(
      valueFirstname,
      valueLastname,
      valueEmail,
      valuebirthdate,
      valueQuantity,
      valueLocation,
      valueTOS,
      valueNews
    );
    console.log("~~~~ TOUT EST OK ~~~~");
    console.log(dataTab);
    return false;
  } else {
    return false;
  }
}