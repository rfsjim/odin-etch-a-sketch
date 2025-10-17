/**
 * @fileoverview An Etch-A-Sketch Style Browser Application
 * @author James
 * @version 0.0.1
 * @date 17Th October 2025
 * @updated 17th October 2025
 * 
 * @description
 * Etch-A-Sketch Style Browser Application
 * For the Odin Project
 */

/**
 * Create a webpage with a 16x16 grid of square divs
 * 
 * Use Flexbox to make the divs appear as a grid (versus just one on each line).
 * Despite the name, do not be tempted to research or use CSS Grid,
 * as it will be taught in a later lesson after the foundations path.
 * This project is an opportunity specifically to practice Flexbox!
 * 
 * Be careful with borders and margins, as they can adjust the size of the squares!
 * 
 * “OMG, why isn’t my grid being created???”
 * Did you link your CSS stylesheet?
 * Open your browser’s developer tools.
 * Check if there are any errors in the JavaScript console.
 * Check your “elements” panel to see if the elements have actually shown up but are somehow hidden.
 * Go willy-nilly and add console.log statements in your JavaScript to see if it’s actually being loaded.
 * 
 * Set up a “hover” effect so that the grid divs change color when your mouse passes over them,
 * leaving a (pixelated) trail through your grid like a pen would.
 * Hint: “Hovering” is what happens when your mouse enters a div and ends when your mouse leaves it.
 * You can set up event listeners for either of those events as a starting point.
 * There are multiple ways to change the color of the divs, including:
 * Adding a new class to the div.
 * Changing the div’s background color using JavaScript.
 * 
 * Add a button on the top of the screen that will send the user a popup asking for the number of squares per side
 * for the new grid.
 * Once entered, the existing grid should be removed, and a new grid should be generated in the same total space as
 * before (e.g., 960px wide) so that you’ve got a new sketch pad.
 * Tip: Set the limit for the user input to a maximum of 100.
 * A larger number of squares results in more computer resources being used, potentially causing
 * delays, freezing, or crashing that we want to prevent.
 * Research button tags in HTML and how you can make a JavaScript function run when one is clicked.
 * Also check out prompts.
 * You should be able to enter 64 and have a brand new 64x64 grid pop up without changing the total amount of pixels used.
 * 
 * Push your project to GitHub!
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
    const createdDivs = new Array;
    const divContainer = document.querySelector("div#container");
    divContainer.replaceChildren();

    for (let i = 0; i < numberDivs; i++)
    {
        createdDivs[i] = new Array;
        for (let j = 0; j < numberDivs; j++)
        {
            createdDivs[i][j] = document.createElement("div");
            createdDivs[i][j].textContent = "";
            divContainer.appendChild(createdDivs[i][j]);
        }

        const rowDivWrapper = document.createElement("div");
        rowDivWrapper.classList.add("row");
        divContainer.insertBefore(rowDivWrapper, createdDivs[i][0]);

        createdDivs[i].forEach(element => {
            rowDivWrapper.appendChild(element);
        });
    }

    addMousOverEventListener();
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
function addMousOverEventListener()
{
    const rowDivs = document.querySelectorAll("div.row > div");

    rowDivs.forEach((gridDiv) =>
    {
        gridDiv.addEventListener("mouseover", (e) => hoverDiv(e));
    });
}

createDivs();

const sizeButton = document.querySelector("button");
sizeButton.addEventListener("click", () => {
    let size = 120;
    while (size >= 100 || Number.isNaN(size))
    {
        size = parseInt(prompt("What width of square? (Max 100)"));
    }

    createDivs(size);
});