
const slider = document.getElementById("myRange");
let selectedSize = slider.value**2;
let numberOfColumnsAndRows = slider.value

// createGrid function dynamically creates grid based on set value for selected size.

function createGrid(totalSize, axisLength) {
    let orderedListElement = document.querySelector("ol");
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

createGrid(selectedSize, numberOfColumnsAndRows);



// Update the current slider value (each time you drag the slider handle) and call the createGrid function in order to generate
// a new grid based on the slider value.
// This works perfectly fine.
slider.oninput = function() {
     numberOfColumnsAndRows = this.value;
     selectedSize = numberOfColumnsAndRows**2;
     clearGrid();
     createGrid(selectedSize, numberOfColumnsAndRows);

};

// Color for a grid element changes when the mouse at least hovered over it once.
// This currently only works with the slider default, not after the slider has been moved!!



function changeBackgroundColor(e) {
    console.log(e);
    e.target.style.backgroundColor="black";
};

    // Seems that the event listener isn't added to the list elements anymore when grid is generated anew based on slider change...

const gridElements = document.querySelectorAll("li");    
gridElements.forEach((element) => {
    element.addEventListener("mouseenter", changeBackgroundColor)
});
