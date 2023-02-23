
// --- Variables
const body = document.body;
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// Form inputs
const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationRadio = document.querySelectorAll('input[name="location"]');
const tos = document.getElementById("tos");
const news = document.getElementById("news");
// Submit button and after sumbission element
const submitBtn = document.querySelector(".btn-submit");
const formOk = document.querySelector(".formok");
// Close buttons
const closeBtn = document.querySelector(".btn-close");
const formOkBtn = document.querySelector(".formok-close");
// Check values
let inputIsOK;
let elementToCheck;
// Base values
let valueFirstname;
let valueLastname;
let valueEmail;
let valuebirthdate;
let valueQuantity;
let valueLocation;
let valueTOS;
let valueNews;
// It will be usefull to create an array with the valid values at submit
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
}
// Regex for email / birthdate / firstname & lastname
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

// --- Events
// Event for every form component
for (input of inputsCheck) { input.addEventListener("change", inputCheck); }
// Event focusout on birthdate because change triggers at every year digit
birthdate.addEventListener("focusout", inputCheck);
// Event when the user select an option
for (input of locationRadio) { input.addEventListener("change", inputCheck) };
// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// --- Launch and close modal functions
function launchModal() {
  modalBg.style.display = "block";
  body.classList.add("noscroll");
  closeBtn.addEventListener("click", closeModal);
  formOkBtn.addEventListener("click", closeValid);
  window.scrollTo(0, 0);
}
function closeModal() {
  modalBg.style.display = "none";
  body.classList.remove("noscroll");
}
function closeValid() {
  modalBg.style.display = "none";
  body.classList.remove("noscroll");
  formAgain();
}

// --- Add the responsive class to the menu
function editNav() {
  let topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.classList.add("responsive");
  } else {
    topNav.classList.remove("responsive");
  }
}

// --- Function who calls validity functions for every input
function inputCheck() {
  elementToCheck = this;
  keepInputs(elementToCheck);
}
function keepInputs(elementToCheck) {
  const nameType = elementToCheck.getAttribute("name");
  const errorText = elementToCheck.parentElement.querySelector(".errormsg");
  
  switch (nameType) {
    case "firstname": {
      checkNames(elementToCheck, nameType, errorText);
      break;
    }
    case "lastname": {
      checkNames(elementToCheck, nameType, errorText);
      break;
    }
    case "email": {
      checkEmail(elementToCheck, errorText);
      break;
    }
    case "birthdate": {
      checkbirthdate(elementToCheck, errorText);
      break;
    }
    case "quantity": {
      checkQuantity(elementToCheck, errorText);
      break;
    }
    case "location": {
      checkLocation(elementToCheck);
      break;
    }
    case "tos": {
      checkTOS(elementToCheck);
      break;
    }
    case "news": {
      checkNews(elementToCheck);
      break;
    }
  }
}

// --- Validity functions
// Values check functions using checkValidity
function checkBadValues(elementToCheck, errorText) {
  let inputIsBad = !elementToCheck.checkValidity();
  if (inputIsBad) {
    inputIsOK = false;
    errorText.textContent = elementToCheck.validationMessage;
    invalidCSS(elementToCheck);
  } else {
    inputIsOK = true;
  }
}
// Check firstname & lastname (using nameType) checkValidity / regex
function checkNames(elementToCheck, nameType, errorText) {
  let nameValue = elementToCheck.value;
  let testRegexOK = nameRegex.test(nameValue);
  checkBadValues(elementToCheck, errorText);
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
  } else {
    nameType === "firstname"?
      (dataCheck.firstname = true) && (valueFirstname = nameValue):
      (dataCheck.lastname = true) && (valueLastname = nameValue);
    validCSS(elementToCheck);
  }
}
// Check email checkValidity / regex
function checkEmail(elementToCheck, errorText) {
  let emailValue = elementToCheck.value;
  let testRegexOK = emailRegex.test(emailValue);
  checkBadValues(elementToCheck, errorText);
  if (!inputIsOK) {
    dataCheck.email = false;
    valueEmail = "";
  } else if (!testRegexOK) {
    dataCheck.email = false;
    valueEmail = "";
    invalidCSS(elementToCheck);
    errorText.textContent = "Veuillez saisir une adresse e-mail valide.";
  } else {
    dataCheck.email = true;
    valueEmail = emailValue;
    validCSS(elementToCheck);
  }
}
// Check birthdate checkValidity / regex / if the date is in the future
function checkbirthdate(elementToCheck, errorText) {
  const today = (new Date()).toISOString().split('T')[0];
  let birthdateValue = elementToCheck.value;
  let testRegexOK = birthdateRegex.test(birthdateValue);
  let isInTheFuture = birthdateValue > today;
  checkBadValues(elementToCheck, errorText);
  if (!inputIsOK && elementToCheck.validity.rangeUnderflow) {
    dataCheck.birthdate = false;
    valuebirthdate = today;
    invalidCSS(elementToCheck);
    errorText.textContent = "Veuillez sélectionner une valeur postérieure ou égale à 01/01/1950.";
  } else if (!testRegexOK) {
    dataCheck.birthdate = false;
    valuebirthdate = today;
    invalidCSS(elementToCheck);
    errorText.textContent = "Veuillez saisir une date de naissance valide.";
  } else if (testRegexOK && isInTheFuture) {
    dataCheck.birthdate = false;
    valuebirthdate = today;
    invalidCSS(elementToCheck);
    errorText.textContent = "Veuillez saisir une date de naissance inférieure à la date du jour.";
  } else {
    dataCheck.birthdate = true;
    valuebirthdate = birthdateValue;
    validCSS(elementToCheck);
  }
}
// Check tournament quantity checkValidity
function checkQuantity(elementToCheck, errorText) {
  let quantityValue = elementToCheck.valueAsNumber;
  checkBadValues(elementToCheck, errorText);
  if (!inputIsOK) {
    dataCheck.quantity = false;
    valueQuantity = 0;
  } else {
    dataCheck.quantity = true;
    valueQuantity = quantityValue;
    validCSS(elementToCheck);
  }
}
// Check Location
function checkLocation(elementToCheck) {
  const errorLocationText = document.querySelector(".location-errormsg");
  dataCheck.location = true;
  valueLocation = elementToCheck.value;
  errorLocationText.classList.remove("show-error");
}
function locationFalse() {
  const errorLocationText = document.querySelector(".location-errormsg");
  errorLocationText.textContent = "Veuillez sélectionner une option.";
  errorLocationText.classList.add("show-error");
}
// Check TOS if checked
function checkTOS(elementToCheck) {
  const errorText = elementToCheck.parentElement.querySelector(".errormsg");
  if (elementToCheck.checked) {
    dataCheck.tos = true;
    valueTOS = "Oui";
    validCSS(elementToCheck);
  } else {
    dataCheck.tos = false;
    valueTOS = "";
    invalidCSS(elementToCheck);
    errorText.textContent = "Vous devez valider les conditions générales afin de vous inscrire.";
  }
}
// Check newsletter if checked
function checkNews(elementToCheck) {
  if (elementToCheck.checked) {
    valueNews = "Oui";
  } else {
    valueNews = "Non";
  }
}

// --- CSS change function
// It show or hide error messages under the input
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

// --- Submit functions
function formComplete() {
  const elementsToHide = Array.from(formData).concat(submitBtn);
  for (element of elementsToHide) {
    element.classList.add("hide-element");
  };
  formOk.classList.remove("hide-element");
}
function submitCheck() {
  inputsCheck.forEach(input => keepInputs(input));
  keepInputs(birthdate);
  if (dataCheck.location == false) {
    locationFalse();
  };
}
// Triggered by the formOkBtn : line 111
function formAgain() {
  form.reset();
  const elementsToHide = Array.from(formData).concat(submitBtn);
  for (element of elementsToHide) {
    element.classList.remove("hide-element");
  };
  formOk.classList.add("hide-element");
  for (input of inputsCheck) {
    input.classList.remove("input-ok");
  };
  birthdate.classList.remove("input-ok");
}

// --- Submit who trigger the submit functions
function validate() {
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
    console.table(dataTab);
    formComplete();
    return false;
  } else {
    submitCheck();
    return false;
  }
}