
var eyepopen = `<svg width="24" height="24" viewBox="0 0 24 24"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">3
<circle cx="12" cy="12" r="3" />
    <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
var eyeclose = `<svg width="24" height="24" viewBox="0 0 24 24"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">    
    <path d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418" />
</svg>`

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function handleDayOnlyClick(event) {
    var dayOnly = document.querySelector("#dayOnly");    
    var btnDayOnly = document.getElementById("DateOnly");   
    if (dayOnly.value === "1") {
        dayOnly.value = "0" ;
        btnDayOnly.innerHTML = eyepopen;  
        
    } else {  
        dayOnly.value = "1" ;
        btnDayOnly.innerHTML = eyeclose;        
    }
    filter();
}
             
function handleDayClick(event) {    
    for (const btn of event.target.parentNode.children) {
        if (event.target.id === btn.id) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    }
    var params = new URLSearchParams(window.location.search);
    var wk = params.get('wk'); 
    var yr = params.get('yr');          
    var DateContainer = event.target.parentNode.parentNode.parentNode.querySelector("#DateContainer");
    var dateLabel = DateContainer.querySelector("#dateLabel");
    dateLabel.placeholder = new Date(event.target.value).toDateString();

    var dateoffset = document.querySelector("#dateoffset");
    dateoffset.value = new Date(event.target.value).toISOString();

    var dayInput = document.querySelector("#day");
    dayInput.value = event.target.id;
    filter();
}    


function createMapMenu(controlDiv, map , DAY1) {

    let comp = [];

    //create a container div for our menu
    var controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlDiv.appendChild(controlUI);

    let customerMenu = document.createElement("div");
    customerMenu.id = "customerMenu";
    controlUI.appendChild(customerMenu);

    //create some buttons for unscheduled and engineers filer
    var DayButtonsContainer = document.createElement("div");
    DayButtonsContainer.id = "DayButtonsContainer";

    var DayButtons = document.createElement("div");    
    DayButtons.classList.add("btn-group", "d-flex", "mt-2", "mb-2");

    let btnSunday = document.createElement("button");   
    btnSunday.textContent = "S";
    btnSunday.id = "Sun";
    btnSunday.value = DAY1;
    btnSunday.title = new Date(DAY1).toDateString();;
    btnSunday.addEventListener("click",  handleDayClick);
    btnSunday.classList.add("btn", "btn-primary", "btn-sm", "w-100");
    DayButtons.appendChild(btnSunday);

    let btnMonday = document.createElement("button");
    btnMonday.textContent = "M";
    btnMonday.id = "Mon";
    btnMonday.value = addDays(DAY1 ,1);
    btnMonday.title = new Date(addDays(DAY1 ,1)).toDateString();
    btnMonday.addEventListener("click",  handleDayClick);       
    btnMonday.classList.add("btn", "btn-primary", "btn-sm", "w-100");
    DayButtons.appendChild(btnMonday);

    let btnTuesday = document.createElement("button");
    btnTuesday.textContent = "T";
    btnTuesday.id = "Tue";
    btnTuesday.value = addDays(DAY1 , 2)
    btnTuesday.title = new Date(addDays(DAY1 ,2)).toDateString();
    btnTuesday.addEventListener("click",  handleDayClick);       
    btnTuesday.classList.add("btn", "btn-primary", "btn-sm", "w-100");
    DayButtons.appendChild(btnTuesday);
    
    let btnWednesday = document.createElement("button");
    btnWednesday.textContent = "W";
    btnWednesday.id = "Wed";
    btnWednesday.value = addDays(DAY1 ,3);
    btnWednesday.title = new Date(addDays(DAY1 ,3)).toDateString();
    btnWednesday.addEventListener("click",  handleDayClick);       
    btnWednesday.classList.add("btn", "btn-primary", "btn-sm", "w-100");
    DayButtons.appendChild(btnWednesday);

    let btnThursday = document.createElement("button");
    btnThursday.textContent = "T";
    btnThursday.id = "Thu";    
    btnThursday.value = addDays(DAY1 ,4);
    btnThursday.title = new Date(addDays(DAY1 ,4)).toDateString();
    btnThursday.addEventListener("click",  handleDayClick);
    btnThursday.classList.add("btn", "btn-primary", "btn-sm", "w-100");
    DayButtons.appendChild(btnThursday);

    let btnFriday = document.createElement("button");
    btnFriday.textContent = "F";
    btnFriday.id = "Fri";
    btnFriday.value = addDays(DAY1 , 5);
    btnFriday.title = new Date(addDays(DAY1 ,5)).toDateString();
    btnFriday.addEventListener("click",  handleDayClick);        
    btnFriday.classList.add("btn", "btn-primary", "btn-sm", "w-100");
    DayButtons.appendChild(btnFriday);  

    let btnSaturday = document.createElement("button");
    btnSaturday.textContent = "S";
    btnSaturday.id = "Sat";
    btnSaturday.value =addDays(DAY1 , 6);
    btnSaturday.title = new Date(addDays(DAY1 ,6)).toDateString();
    btnSaturday.addEventListener("click",  handleDayClick);        
    btnSaturday.classList.add("btn", "btn-primary", "btn-sm", "w-100");
    DayButtons.appendChild(btnSaturday  );

    DayButtonsContainer.appendChild(DayButtons);
    customerMenu.appendChild(DayButtonsContainer);

    let btnDayOnly = document.createElement("button");    
    btnDayOnly.id = "DateOnly";    
    btnDayOnly.addEventListener("click",  handleDayOnlyClick);        
    btnDayOnly.title = "Toggle today only";    
    btnDayOnly.innerHTML = eyeclose ;
    DayButtons.appendChild(btnDayOnly  );

    DayButtonsContainer.appendChild(DayButtons);
    customerMenu.appendChild(DayButtonsContainer);

    // Create a new div
    var DateContainer = document.createElement("div");
    DateContainer.id = "DateContainer";
    DateContainer.classList.add("input-group","input-group-sm","mb-1");
    
    // Create a new text field
    var dateLabel = document.createElement("input");
    dateLabel.id = "dateLabel";
    dateLabel.type = "text";
    dateLabel.style.textAlign = "center";
    dateLabel.placeholder = "Date";
    dateLabel.classList.add("form-control");
    dateLabel.disabled = true;

    // Append the text field to the div
    DateContainer.appendChild(dateLabel);
    customerMenu.appendChild(DateContainer);

    // Append the label to the div
    DateContainer.appendChild(dateLabel);
    customerMenu.appendChild(DateContainer);
    
}
