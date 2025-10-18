/**
 * @fileoverview An Etch-A-Sketch Style Browser Application
 * @author James
 * @version 1.2.0
 * @date 17Th October 2025
 * @updated 17th October 2025
 * 
 * @description
 * Etch-A-Sketch Style Browser Application
 * For the Odin Project
 */

/**
 * Creates a square grid of divs with the specified number of cells per row and column
 * @param {number} [numberDivs = 16] The number of cells per row and column in the grid
 * @returns {void} 
 */
function createDivs(numberDivs = 16)
{
    const divContainer = document.querySelector("div#container");
    divContainer.replaceChildren();

    const cellSizePercent = 100 / numberDivs;

    for (let i = 0; i < numberDivs; i++)
    {
        const rowDivWrapper = document.createElement("div");
        rowDivWrapper.classList.add("row");

        for (let j = 0; j < numberDivs; j++)
        {
            const cell = document.createElement("div");
            cell.textContent = "";
            cell.style.width = `${cellSizePercent}%`;
            rowDivWrapper.appendChild(cell);
        }

        divContainer.appendChild(rowDivWrapper);
    }

    addMouseOverEventListener();
}

/**
 * Creates a random hex colour
 * @returns {string} random hex colour
 */
function getRandomColour()
{
    const randomColour = Math.floor(Math.random() * MAX_HEX_COLOUR).toString(16).padStart(6, '0');
    return `#${randomColour}`;
}

/**
 * Converts a hex colour into a RGBA colour
 * @param {string} hexColour Original Hex colour
 * @param {number} opacity Opacity level
 * @returns {string} RGBA Colour 
 */
function hexToRGBA(hexColour, opacity)
{
    const hex = hexColour.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Transforms the style of the div grid cells.
 * When mouseover the divs, updates the cell with a random background colour
 * Progressively darkens the colour each subsequent hover
 * @param {MouseEvent} event The mouseover event
 * @returns {void} 
 */
function hoverDiv(event)
{
    let counter;
    if (!event.target.dataset.count)
    {
        event.target.dataset.count = '1';
        const hexColour = getRandomColour();
        event.target.dataset.hex = hexColour;
        event.target.style.backgroundColor = hexToRGBA(hexColour, 0.05);
    }
    else
    {
        counter = parseInt(event.target.dataset.count, 10);
        counter++;
        counter = Math.min(counter, 10);
        event.target.dataset.count = counter.toString(10);

        const hoverOpacity = counter * 0.1;
        event.target.style.backgroundColor = hexToRGBA(event.target.dataset.hex, hoverOpacity);
    }
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
const MAX_HEX_COLOUR = 16777216;

createDivs();

const sizeButton = document.querySelector("button");
sizeButton.addEventListener("click", () => {
    let size = 120;

    while (size > MAX_WIDTH_SIZE || size < 1 || Number.isNaN(size))
    {
        const input = prompt("What width of square? (Max 100)");
        if (input === null) return; // Handle cancelling prompt box
        size = parseInt(input);
    }

    createDivs(size);
});