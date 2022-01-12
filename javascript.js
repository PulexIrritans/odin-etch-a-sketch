
const sliderElement = document.getElementById("myRange");
const clearButtonElement = document.getElementById("clear-btn");
const colorPickerElement = document.getElementById("grid-color");
const orderedListElement = document.querySelector("ol");
const rainbowModeBtnElement = document.getElementById("rainbow-btn");
const gradientModeBtnElement = document.getElementById("gradient-btn");
const defaultBackgroundColor = "rgb(255, 255, 255)";

let pickedPenColor = colorPickerElement.value;
let selectedSize = sliderElement.value**2;
let numberOfColumnsAndRows = sliderElement.value;
let rainbowMode=false;
let gradientMode=false;

// createGrid function dynamically creates grid based on set value for selected size. Default is set in HTML-Slider.

function createGrid(totalSize, axisLength) {
    
    for(let i=1; i<=totalSize; i++) {
        let newListElement = document.createElement("li");
        orderedListElement.append(newListElement);
    };
    orderedListElement.setAttribute("style", "grid-template-columns: repeat("+axisLength+", 1fr); grid-template-rows: repeat("+axisLength+", 1fr)");
};

// clearGrid function deletes all items from the grid so it can be defined anew

function clearGrid() {
    let orderedListElement = document.querySelector("ol");
     orderedListElement.innerHTML="";
};


// AddEventlistenerToGridItems will do what it says. Needs to be called again when the grid is reset by slider


function addEventListenerToGridItems() {
    const gridElements = document.querySelectorAll("li");    
gridElements.forEach((element) => {
    element.addEventListener("mouseenter", changeBackgroundColor)
});
}    


// Color for a grid element changes when the mouse at least hovered over it once.


function changeBackgroundColor(e) {
    if (rainbowMode) {
        e.target.style.backgroundColor=randomColor();
    } else {
    e.target.style.backgroundColor=pickedPenColor;
    }
};

// randomColor generates random rgb that is being used as pen color for each grid item in rainbow mode.

function randomColor() {

    const max=255;
    r=Math.floor(Math.random() * max);
    g=Math.floor(Math.random() * max);
    b=Math.floor(Math.random() * max);
    console.log(`rgb(${r},${g},${b})`)
    return `rgb(${r},${g},${b})`;
};



// Here the board gets created initially by calling the respective functions.


createGrid(selectedSize, numberOfColumnsAndRows);
addEventListenerToGridItems();



// In the following section all the event listeners for the user settings can be found

sliderElement.oninput = function() {
     numberOfColumnsAndRows = this.value;
     selectedSize = numberOfColumnsAndRows**2;
     clearGrid();
     createGrid(selectedSize, numberOfColumnsAndRows);
     addEventListenerToGridItems();
};

clearButtonElement.onclick = function() {
    const gridElements = document.querySelectorAll("li");   
    gridElements.forEach((element) => {
        element.style.backgroundColor=defaultBackgroundColor;
});
};

colorPickerElement.oninput = function () {
    rainbowMode=false;
    gradientMode=false;
    pickedPenColor = this.value;
    return pickedPenColor;
}

rainbowModeBtnElement.onclick = function() {
    rainbowMode=true;
};