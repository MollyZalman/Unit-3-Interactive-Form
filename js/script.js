                                                                 /*#########################################
                                                                        Treehouse FSJS Techdegree:
                                                                    Project 3 - An Interactive Form
                                                                ##########################################*/


//Job Role Selection Section

//Inspired by: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden
const title = document.getElementById("title");
const otherTitle = document.getElementById("other-title");
otherTitle.style.display = "none";
//if other is picked, then text box displays. If not, it doesn't display.
title.addEventListener('change', (e) => {
    if (e.target.value === 'other'){
        otherTitle.style.display = "block";
    } else {
        otherTitle.style.display = "none";
        otherTitle.style.border = "none";
    }
});

//T-shirt Selection Section

//Disables Select a Color
//Inspired by: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden and https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
const disableColor = document.getElementById("color");
disableColor.disabled = true;
 const themeSelect = document.createElement('option');
 themeSelect.text = 'Please select a T-shirt theme!';
//Blocks user from selecting a color before a theme by displaying "Please select a T-shirt theme!", creating a new option
//Adds it to color select at beginning of list
//Inspired by: https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option
disableColor.add(themeSelect, disableColor.options[0]);
disableColor.selectedIndex = '0';
//No selecting here!
themeSelect.disabled = true;
//Only once a theme is selected can someone pick a color. I don't make the rules!
const shirtDesign = document.getElementById("design");
shirtDesign.addEventListener('change', (e) => {
    disableColor.disabled = false;
    //Inspired by: https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedIndex
    disableColor.selectedIndex = '0'; 
    //If the user selects a heart, the pun options are disabled
    if (e.target.value === 'heart js') {
        // Inspired by: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
        let j;
        for (j = 0; j < disableColor.length; j++) {
            if (disableColor.options[j].text.includes('Puns')) {
                disableColor.options[j].hidden = true;
            } else {
                disableColor.options[j].hidden = false;
            }                  
        }
    }
    //If the user selects Puns, the heart options are disabled
    if (e.target.value === 'js puns') {
      let j;
      for (j = 0; j < disableColor.length; j++) {
          if (disableColor.options[j].text.includes('♥')) {
              disableColor.options[j].hidden = true;
          }   else {
              disableColor.options[j].hidden = false;
          }                  
      } 
  }  
});

//Activity Section

//Creates new h3 element for the total and sets initial value (before anything is checked) to 0
const activity = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('label input');
let initialCost = 0; 
const total = document.createElement('h3');
activity.appendChild(total);

//Creates a new h5 element for the error message, you have to pick at least one!
const activityLegend = document.querySelector('.activities legend');
const activityError = document.createElement('h5');
activityError.innerHTML = 'Wait! Please select an activity.';
activityError.style.margin = '10px 1px -5px 1px';
activityError.style.textAlign = 'center';
activityError.hidden = true;
activityLegend.appendChild(activityError);

//Activates and deactivates checkboxes based on date and time
activity.addEventListener('change', (e) => {
    let selected = e.target;
    //Inspired by: https://www.javascripttutorial.net/javascript-dom/javascript-getattribute/
    //If you check a box, this will account for the date and time you picked
	let timeSelected = selected.getAttribute('data-day-and-time'); 
	//loops through each option at light-speed while analyzing the dates and times
	for (let j = 0; j < checkboxes.length; j++) {
		const dayAndTime = checkboxes[j].getAttribute('data-day-and-time'); 
		if (timeSelected === dayAndTime && selected !== checkboxes[j]) {
			if (selected.checked) {
        //Same date/time? No can do! 
        //Different times? You got it!       
        checkboxes[j].disabled = true;
      } else {
        checkboxes[j].disabled = false;
      }
		}
    }
    //Math! Adds the cost or subtracts the cost based on what is selected or deselected 
    //Inspired by: https://www.samanthaming.com/tidbits/55-how-to-truncate-number/
	let addedCost = Math.trunc(selected.getAttribute('data-cost'));
	if (selected.checked === true) {
		initialCost += addedCost; 
	} else {
		initialCost -= addedCost; 
	}
    total.innerHTML = `Your total: $${initialCost}`;
    total.style.color = 'yellow';
    total.style.textAlign = 'center';
}); 

//Validating Activities Section

const validateActivity = () => {
  //loop through the activity choices and hide the error message if at least one of the activities is checked
  for (let j = 0; j < checkboxes.length; j++) {
    if (checkboxes[j].checked) {
      activityError.hidden = true;
      return true;
    }
  }
  //Was going to honor Guil with Tomato here but Yellow is more striking
  activityError.style.color = 'yellow';
  activityError.hidden = false;
  return false;
}

//Payment Selection Section

const payment = document.querySelector('#payment');
const timeToPay = payment[0];
const selectMethod = document.querySelector("#payment > option:nth-child(1)");
const creditCard = document.querySelector("#payment [value='credit card']");
const creditCardDiv = document.querySelector('#credit-card');
const paypal = document.querySelector("#payment [value='paypal']" );
const paypalDiv = document.querySelector("#paypal" );
const bitcoin = document.querySelector("#payment [value='bitcoin']");
const bitcoinDiv = document.querySelector("#bitcoin" );

//Automatically selects credit card as default
creditCard.selected = true;
selectMethod.hidden = true;
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

//If the credit card method is selected, the two other elements are blocked and so on
payment.addEventListener('change', (e) => {
    selectPayment = e.target.value;
    if (selectPayment === creditCard.value ){
        creditCardDiv.style.display = 'block';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    }else if(selectPayment === paypal.value){
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'block';
        bitcoinDiv.style.display = 'none';
    }else if(selectPayment === bitcoin.value){
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
    }
});

let selectPayment = document.querySelector('#payment').value;  

//Validation Section

const name = document.querySelector('#name'); 
const nameError = document.createElement("div"); 
const email = document.querySelector('#mail');
const emailError = document.createElement("div"); 
const cardNumber = document.getElementById('cc-num');
const creditCardError = document.createElement("div");
const zip = document.getElementById('zip'); 
const zipError = document.createElement("div"); 
const cvv = document.getElementById('cvv');
const cvvError = document.createElement("div"); 

//Validates the name
//Inspired by: https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before
const validateName = () => {
    if (name.value.length > 0) {
        if(nameError){
        nameError.remove();
        name.style.border = '2px solid #330099';
        }
        return true;

    } else {
        name.before(nameError);
        name.style.border = '3px solid yellow';
        nameError.innerText = "What's your name? We'd love to know!";
        nameError.style.color = 'yellow';
        nameError.style.margin = '5px';
        nameError.style.textAlign = 'center';
        return false;
    }
};

//Validates email
//Inspired by: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
const validateEmail = () => {
    const addAtSymbol = email.value.indexOf('@');
    const addDot = email.value.lastIndexOf('.');

    if (addAtSymbol > 1 && addDot > addAtSymbol) { 
        if(emailError){
        emailError.remove();
    }
        return true;

    } else {
        email.before(emailError);
        email.style.border = '3px solid yellow';
        emailError.innerText = "Let's be friends! Please enter a valid email.";
        emailError.style.color = 'yellow';
        emailError.style.margin = '5px';
        emailError.style.textAlign = 'center';
        return false;
    }
};

email.addEventListener('input', () => {
    const isEmailCorrect = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email.value.toUpperCase());
    if(isEmailCorrect){
        if(emailError) {
        emailError.remove();
        email.style.border = '2px solid #330099';
    }
        return true;

    } else {
        email.style.border = '3px solid yellow';
        email.before(emailError);
        emailError.innerText = "Let's be friends! Please enter a valid email.";
        emailError.style.color = 'yellow';
        emailError.style.margin = '5px';
        emailError.style.textAlign = 'center';
        emailError.style.border = '#330099';
        return false;
    }
});

//Validates credit card
//Inspired by: https://www.regular-expressions.info/creditcard.html
const validateCreditCard = () => {
    //Accommodates all card types between 13-16 numbers
    const isCCCorrect = /^[0-9]{13,16}$/.test(cardNumber.value);
    //Allows only 9 digit zip code with or without dashes
    const isZipCorrect = /^[0-9]{5}$/.test(zip.value);
    //Accommodates all card cvv types with either 3 or 4 numbers
    const isCvvCorrect = /^[0-9]{3}$/.test(cvv.value);
        
    if (isCCCorrect && creditCardError) {
        cardNumber.style.border = '2px solid #330099';
        creditCardError.remove();
    } 

    if (isZipCorrect && zipError) {
        zip.style.border = '2px solid #330099';
        zipError.remove();
    }

    if (isCvvCorrect && cvvError) {
        cvv.style.border = '2px solid #330099';
        cvvError.remove();
    }
    
    if (!isCCCorrect) {
        cardNumber.before(creditCardError);
        cardNumber.style.border = '3px solid yellow';
        cardNumber.style.margin = '5px';
        cardNumber.style.textAlign = 'center';
        creditCardError.innerText = "Whoops! Invalid card information.";

        if (cardNumber.value.length > 16 ) {
            creditCardError.innerText = "Cannot be more than 16 digits...";
        }
        if (cardNumber.value.length < 13 ) {
            creditCardError.innerText = "Enter between 13-16 digits...";
        }
        if (isNaN(cardNumber.value)) {
            creditCardError.innerText = "Remove special characters/letters.";
        }
    }

    if (!isZipCorrect) {
        zip.before(zipError);
        zip.style.border = '3px solid yellow';
        zip.style.margin = '5px';
        zip.style.textAlign = 'center';
        zipError.innerText = "Invalid zip...";   
    }

    if (!isCvvCorrect) {
        cvv.before(cvvError);
        document.getElementById('cvv').style.border = '3px solid yellow';
        cvv.style.margin = '5px';
        cvvError.style.textAlign = 'left';
        cvvError.innerText = "3 or 4 digits...";
    }

    if (isCCCorrect && isZipCorrect && isCvvCorrect) {
        return true;
    }   
    zip.addEventListener('keyup', validateCreditCard);
    cvv.addEventListener('keyup', validateCreditCard);
}

//Inspired by: https://www.w3schools.com/jsref/met_form_reset.asp#:~:text=The%20reset()%20method%20resets,method%20to%20submit%20the%20form.
const form = document.querySelector("form");
form.addEventListener ('submit', (e) => {
    if (!validateName()) {
      e.preventDefault();
    }

    if (!validateEmail()) {
      e.preventDefault();
    }

    if (!validateActivity()) {
        e.preventDefault();
    }

    if (selectPayment === 'credit card') {
        if (!validateCreditCard()) {
            e.preventDefault();
        }
    }
});

name.addEventListener('keyup', validateName);

//Autofocus feature for first text field
document.getElementById('name').focus();

//Validates the activity section
activity.addEventListener('click', validateActivity);

document.querySelector("form").reset();

cardNumber.addEventListener('keyup', validateCreditCard);
