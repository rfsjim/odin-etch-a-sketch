/**
 * @fileoverview An Etch-A-Sketch Style Browser Application
 * @author James
 * @version 1.1.1
 * @date 17Th October 2025
 * @updated 17th October 2025
 * 
 * @description
 * Etch-A-Sketch Style Browser Application
 * For the Odin Project
 */

/**
 * Extra credit
 * Transform the behavior of a square when interacting with the mouse by introducing a series of modifications.
 * 
 * Rather than squares being the same color throughout the grid, randomize the squares’ RGB values with each interaction.
 * 
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
 * Returns a random hex colour
 * @returns {string} random hex colour
 */
function getRandomColour()
{
    const randomColour = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    return `#${randomColour}`;
}

/**
 * Transforms the style of divs when mouseover the divs
 * @param {event} event
 * @returns {void} 
 */
function hoverDiv(event)
{
    let counter;
    if (!event.target.dataset.count)
    {
        event.target.dataset.count = '1';
        event.target.style.backgroundColor = getRandomColour();
    }
    else
    {
        counter = parseInt(event.target.dataset.count, 10);
        counter++;
        counter = Math.min(counter, 10);
        event.target.dataset.count = counter.toString(10); 
    }

    event.target.textContent = event.target.dataset.count;
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

    while (size > MAX_WIDTH_SIZE || size < 1 || Number.isNaN(size))
    {
        const input = prompt("What width of square? (Max 100)");
        if (input === null) return; // Handle cancelling prompt box
        size = parseInt(input);
    }

    createDivs(size);
});