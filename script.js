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

let isPulsing = false;

randomizer.disabled = true;

function helperGetRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Preload all images to prevent delay on first render
 */
function preloadImages() {
    data.characters.forEach(item => {
        const img = new Image();
        img.src = `images/characters/${item.image}`;
    });

    data.vehicles.forEach(item => {
        const img = new Image();
        img.src = `images/vehicles/${item.image}`;
    });

    data.tires.forEach(item => {
        const img = new Image();
        img.src = `images/tires/${item.image}`;
    });

    data.gliders.forEach(item => {
        const img = new Image();
        img.src = `images/gliders/${item.image}`;
    });
}

/**
 * Loads all game data from JSON files in parallel.
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

        preloadImages();

        randomizer.disabled = false;
    } catch (error) {
        console.error('Error loading data: ', error)
    }
}

/**
 * Toggles subtle loading animation
 */
function setPulsingState(container, pulsing) {
    const img = container.querySelector('img');
    const name = container.querySelector('.name');

    if(pulsing) {
        img.classList.add('animate-pulse', 'opicity-50');
        name.classList.add('animate-pulse', 'text-gray-400');   
    } else {
        img.classList.remove('animate-pulse', 'opicity-50');
        name.classList.remove('animate-pulse', 'text-gray-400');
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

    img.classList.remove('opacity-100');
    img.classList.add('opacity-0');

    setTimeout(() => {
        img.src = `images/${folder}/${item.image}`;
        img.alt = item.name;
        name.textContent = item.name;

        img.classList.remove('opacity-0');
        img.classList.add('opacity-100');
    }, 150);
}

/**
 * Generates a random combination with a short animation delay
 */
async function getRandomCombination() {
    if (isPulsing || !data.characters.length) return;

    isPulsing =  true;
    randomizer.disabled = true;

    setPulsingState(characterDiv, true);
    setPulsingState(vehicleDiv, true);
    setPulsingState(tiresDiv, true);
    setPulsingState(gliderDiv, true);

    await delay(1500);
    updateRandomCombinationDivs(characterDiv, helperGetRandom(data.characters), 'characters');
    await delay(500);
    updateRandomCombinationDivs(vehicleDiv, helperGetRandom(data.vehicles), 'vehicles');
    await delay(500);
    updateRandomCombinationDivs(tiresDiv, helperGetRandom(data.tires), 'tires');
    await delay(500);
    updateRandomCombinationDivs(gliderDiv, helperGetRandom(data.gliders), 'gliders');
    await delay(250);

    setPulsingState(characterDiv, false);
    setPulsingState(vehicleDiv, false);
    setPulsingState(tiresDiv, false);
    setPulsingState(gliderDiv, false);

    isPulsing = false;
    randomizer.disabled = false;
}

randomizer.addEventListener("click", getRandomCombination);

loadJsonData();