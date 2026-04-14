const randomizer = document.getElementById("randomizer");
const randomCombination = document.getElementById("randomCombination");
const characterDiv = document.getElementById("character");
const vehicleDiv = document.getElementById("vehicle");
const tiresDiv = document.getElementById("tires");
const gliderDiv = document.getElementById("glider");

let data = {
    characters: [],
    vehicles: [],
    tires: [],
    gliders: []
}

randomizer.disabled = true;

function helperGetRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Loads all game data from JSON files in parallel.
 * Enables UI interaction once all datasets are successfully loaded.
 */
async function loadJsonData() {
    try {
        const [characters, vehicles, tires, gliders] = await Promise.all([
            fetch('./data/characters.json').then(r => r.json()),
            fetch('./data/vehicles.json').then(r => r.json()),
            fetch('./data/tires.json').then(r => r.json()),
            fetch('./data/gliders.json').then(r => r.json())
        ]);

        data.characters = characters;
        data.vehicles = vehicles;
        data.tires = tires;
        data.gliders = gliders;

        randomizer.disabled = false;
    } catch (error) {
        console.error('Error loading data: ', error)
    }
}

/**
 * Updates a UI block with selected item data.
 */
function updateRandomCombinationDivs(container, item, folder) {
    if (!item) {
        console.warn("Missing item for:", folder);
        return;
    }

    const img = container.querySelector('img');
    const name = container.querySelector('.name');

    img.src = `images/${folder}/${item.image}`;
    img.alt = item.name;
    name.textContent = item.name;
}

/**
 * Generates a full random loadout and updates the UI.
 * Ensures all categories are populated before rendering.
 */
function getRandomCombination() {
    if (!data.characters.length) return;

    updateRandomCombinationDivs(characterDiv, helperGetRandom(data.characters), 'characters');
    updateRandomCombinationDivs(vehicleDiv, helperGetRandom(data.vehicles), 'vehicles');
    updateRandomCombinationDivs(tiresDiv, helperGetRandom(data.tires), 'tires');
    updateRandomCombinationDivs(gliderDiv, helperGetRandom(data.gliders), 'gliders')
}

randomizer.addEventListener("click", getRandomCombination);

loadJsonData();