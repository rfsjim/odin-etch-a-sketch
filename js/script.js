/**
 * @fileoverview An Etch-A-Sketch Style Browser Application
 * @author James
 * @version 0.5.1
 * @date 17Th October 2025
 * @updated 17th October 2025
 * 
 * @description
 * Etch-A-Sketch Style Browser Application
 * For the Odin Project
 */

/**
 * Be careful with borders and margins, as they can adjust the size of the squares!
 * 
 * Extra credit
 * Transform the behavior of a square when interacting with the mouse by introducing a series of modifications.
 * 
 * Rather than squares being the same color throughout the grid, randomize the squares’ RGB values with each interaction.
 * Additionally, implement a progressive darkening effect where each interaction darkens the square by 10%.
 * The goal is to achieve a fully black (or completely colored) square in only ten interactions.
 * Hint: The opacity CSS property is useful here.
 * To learn how to use it, check this MDN docs article about the opacity CSS property.
 * You can choose to do either one or both of these challenges, it’s up to you.
 */

/**
 * Creates Grid of divs
 * @param {number} [numberDivs = 16]
 * @returns {void} 
 */
function createDivs(numberDivs = 16)
{
    const divContainer = document.querySelector("div#container");
    divContainer.replaceChildren();

    for (let i = 0; i < numberDivs; i++)
    {
        const rowDivWrapper = document.createElement("div");
        rowDivWrapper.classList.add("row");

        for (let j = 0; j < numberDivs; j++)
        {
            const cell = document.createElement("div");
            const cellSize = Math.floor(CELL_CONTAINER_WIDTH / numberDivs)
            cell.textContent = "";
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            rowDivWrapper.appendChild(cell);
        }

        divContainer.appendChild(rowDivWrapper);
    }

    addMouseOverEventListener();
}

/**
 * Add class to style of divs when mouseover the divs
 * @param {event} event
 * @returns {void} 
 */
function hoverDiv(event)
{
    event.target.classList.add("hovered");
}

/**
 * Adds mouseover event listener
 * @returns {void}
 */
function addMouseOverEventListener()
{
    const rowDivs = document.querySelectorAll("div.row > div");

    rowDivs.forEach((gridDiv) =>
    {
        gridDiv.addEventListener("mouseover", (e) => hoverDiv(e));
    });
}

const MAX_WIDTH_SIZE = 100;
const CELL_CONTAINER_WIDTH = 960;

createDivs();

const sizeButton = document.querySelector("button");
sizeButton.addEventListener("click", () => {
    let size = 120;

    while (size > MAX_WIDTH_SIZE || Number.isNaN(size))
    {
        const input = prompt("What width of square? (Max 100)");
        if (input === null) return; // Handle cancelling prompt box
        size = parseInt(input);
    }

    createDivs(size);
});