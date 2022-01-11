
const sliderElement = document.getElementById("myRange");
const clearButtonElement = document.getElementById("clear-btn");
const colorPickerElement = document.getElementById("grid-color");
const orderedListElement = document.querySelector("ol");
const rainbowModeBtnElement = document.getElementById("rainbow-btn");
let pickedPenColor = colorPickerElement.value;
const defaultBackgroundColor = "#FFFFFF";
let selectedSize = sliderElement.value**2;
let numberOfColumnsAndRows = sliderElement.value;

// createGrid function dynamically creates grid based on set value for selected size.

function createGrid(totalSize, axisLength) {
    
    for(let i=1; i<=totalSize; i++) {
        let newListElement = document.createElement("li");
        orderedListElement.append(newListElement);
    };
    orderedListElement.setAttribute("style", "grid-template-columns: repeat("+axisLength+", 1fr); grid-template-rows: repeat("+axisLength+", 1fr)");
};

// clearGrid function erases all colors from the grid

function clearGrid() {
    let orderedListElement = document.querySelector("ol");
     orderedListElement.innerHTML="";

};


// AddEventlistenerToGridItems will do what it says. Needs to be called again when the grid is reset, e.g. by slider or "Clear Button"


function addEventListenerToGridItems() {
    const gridElements = document.querySelectorAll("li");    
gridElements.forEach((element) => {
    element.addEventListener("mouseenter", changeBackgroundColor)
});
}    


// Color for a grid element changes when the mouse at least hovered over it once.


function changeBackgroundColor(e) {
    console.log(e);
    e.target.style.backgroundColor=pickedPenColor;
};



// Here the board gets created initially by calling the functions.


createGrid(selectedSize, numberOfColumnsAndRows);
addEventListenerToGridItems();



// Update the current slider value (each time you drag the slider handle) and call the createGrid function in order to generate
// a new grid based on the slider value.

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
    pickedPenColor = this.value;
    return pickedPenColor;
}


