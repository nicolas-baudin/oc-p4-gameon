function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalclose = document.querySelectorAll(".close");

// launch and close modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalclose.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// form variables
function validate(){
  let firstname=document.getElementById("firstname").value;
  let lastname=document.getElementById("lastname").value;
  let email=document.getElementById("email").value;
  let birthdate=document.getElementById("birthdate").value;
  let quantity=document.getElementById("quantity").value;
  let location=document.getElementById("location1").value; // voir comment récupérer le bon radio plutôt que location1
    alert(
      firstname + ", " + 
      lastname + ", " + 
      email + ", " + 
      birthdate + ", " + 
      quantity + ", " + 
      location);
}

