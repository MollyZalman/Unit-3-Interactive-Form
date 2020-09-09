                                                                 /*#########################################
                                                                        Treehouse FSJS Techdegree:
                                                                    Project 3 - An Interactive Form
                                                                ##########################################*/


//Job Role selection section
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
    }
});

//T-shirt Selection Section
//Disables Select a Color
//Inspired by: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden and https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
const disableColor = document.getElementById("color");
disableColor.disabled = true;
//Blocks user from selecting a color before a theme by displaying "Please select a T-shirt theme!" by creating a new option
const themeSelect = document.createElement('option');
themeSelect.text = 'Please select a T-shirt theme!';
//Adds it to color select at beginning of list
//Inspired by: https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option
disableColor.add(themeSelect, disableColor.options[0]);
disableColor.selectedIndex = '0';
//No selecting here!
themeSelect.disabled = true;

//Only once a theme is selected can someone pick a color. I don't make the rules!
const shirtDesign = document.getElementById("design");
design.addEventListener('change', (e) => {
    disableColor.disabled = false;
    //Resets the color select to the placeholder (so when user changes theme, they are prompted to chose again)
    //Inspired by: https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedIndex
    disableColor.selectedIndex = '0'; 
    //If the user selects a heart, the pun options are disabled
    if (e.target.value == '♥ js') {
        // Inspired by: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
        let j;
        for (j= 0; j< color.length; j++) {
            if (disableColor.options[j].text.includes('Puns')) {
                disableColor.options[j].hidden = true;
            }   else {
                disableColor.options[j].hidden = false;
            }                  
        }
    } 
    //If user selects Puns, the heart options are disabled
    if (e.target.value = 'js puns') {
      //Loops through each option to match js puns with the right colors
      let j;
      for (j= 0; j< disableColor.length; j++) {
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
}); 

//validating the activities section
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

// function isValidName (name){

// }

// function isValidEmail (email){

// }

// function isValidCardNumber (card-number){

// }

// function isValidZipCode (zip-code){

// }

// function isValidCvv (cvv){

// }



// const nameInput = document.getElementById("name");
// const emailInput = document.getElementById("email");
// const cardNumberInput = document.getElementById("card-number");
// const zipCodeInput = document.getElementById("zip-code");
// const cvvInput = document.getElementById("cvv");

// nameInput.addEventListener("input", createListener(isValidName));

// emailInput.addEventListener("input", createListener(isValidEmail));

// cardNumberInput.addEventListener("input", createListener(isValidCardNumber));

// zipCodeInput.addEventListener("input", createListener(isValidZipCode));

// cvvInput.addEventListener("input", createListener(isValidCvv));

//Autofocus feature for first text field
document.getElementById('name').focus();

//Validates the activity section
activity.addEventListener('click', validateActivity);