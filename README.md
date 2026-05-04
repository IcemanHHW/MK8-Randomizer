# MK8-Randomizer

A small project that generates random Mario Kart 8 Deluxe combinations (character, vehicle, tires, glider).
The project uses JSON files to store data and dynamically updates the UI based on random selections.


## Features

- Generates random combinations
- JSON-based data structure
- Asynchronous data loading with `Promise.all`
- Basic UI feedback (loading animation + transitions)
- Image preloading to improve responsiveness


## How it works

On page load, multiple JSON files are fetched in parallel using `Promise.all`.
When the user clicks the button, a random item is selected from each category and rendered into the UI by updating the image and name. A short animation state is shown during generation for visual feedback.


## Running the project locally

1. Install dependencies: `npm install`
2. Starts local dev server: `npm run dev`