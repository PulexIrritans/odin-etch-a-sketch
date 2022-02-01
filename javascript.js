
const sliderElement = document.getElementById("myRange");
const sliderValueElement = document.getElementById("rangeValue");
const clearButtonElement = document.getElementById("clear-btn");
const colorPickerElement = document.getElementById("grid-color");
const gradientModeButtonElement = document.getElementById("gradient-btn");
const orderedListElement = document.querySelector("ol");
const rainbowModeBtnElement = document.getElementById("rainbow-btn");
const defaultBackgroundColor = "rgba(255, 255, 255, 1)";

let pickedPenColor = colorPickerElement.value;
let selectedSize = sliderElement.value**2;
let numberOfColumnsAndRows = sliderElement.value;
let rainbowMode=false;
let gradientMode=false;
let initialGradient = 0;


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
        e.target.style.opacity = 1;
    } else if (gradientMode) {
        e.target.style.opacity=gradientColor(e);
    } else {
    e.target.style.backgroundColor=pickedPenColor;
    e.target.style.opacity = 1;
    }
};

// randomColor generates random rgb that is being used as pen color for each grid item in rainbow mode.

function randomColor() {

    const max=255;
    r=Math.floor(Math.random() * max);
    g=Math.floor(Math.random() * max);
    b=Math.floor(Math.random() * max);
    return `rgb(${r},${g},${b})`;
};


// Gradient mode generates value for opacity starting from default 1 down to 0 with every event. Full opacity (value 0) means that black background is fully visible.

function gradientColor(e) {
    let opacity = window.getComputedStyle(e.target).opacity;
    if (opacity>0) {
        opacity = opacity-0.1;
        return opacity;
    } else {
        return opacity;
    }
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

sliderElement.onChange= function() {
    sliderValueElement.innerHTML = this.value+' x '+this.value;
}
sliderElement.onmousemove= function() {
    sliderValueElement.innerHTML = this.value+' x '+this.value;
}

clearButtonElement.onclick = function() {
    const gridElements = document.querySelectorAll("li");   
    gridElements.forEach((element) => {
        element.style.backgroundColor=defaultBackgroundColor;
        element.style.opacity=1;
});
};

colorPickerElement.oninput = function () {
    rainbowMode=false;
    gradientMode=false;
    pickedPenColor = this.value;
    return pickedPenColor;
}

rainbowModeBtnElement.onclick = function() {
    gradientMode=false;
    rainbowMode=true;
};

gradientModeButtonElement.onclick = function() {
    rainbowMode = false;
    gradientMode = true;
};