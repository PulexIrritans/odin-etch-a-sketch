selectedSize = 10000;
numberOfColumnsAndRows = Math.sqrt(selectedSize);


// Dynamically creates grid based on set value for selected size.

function createGrid(size) {
    let orderedListElement = document.querySelector("ol");
    for(let i=1; i<=size; i++) {
        let newListElement = document.createElement('li');
        
        orderedListElement.append(newListElement);
    };
    orderedListElement.setAttribute("style", "grid-template-columns: repeat("+numberOfColumnsAndRows+", 1fr); grid-template-rows: repeat("+numberOfColumnsAndRows+", 1fr)");


};

createGrid(selectedSize);



// Color for a grid element changes when the mouse at least hovered over it once.

function changeBackgroundColor(e) {
    console.log(e);
    e.target.style.backgroundColor="black";
};

const gridElements = document.querySelectorAll("li");


gridElements.forEach((element) => {
    element.addEventListener("mouseenter", changeBackgroundColor)
});
