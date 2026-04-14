# MK8-Randomizer

A small project that generates random Mario Kart 8 Deluxe loadouts (character, vehicle, tires, glider).
The project uses JSON files to store data and dynamically updates the UI based on random selections.

## How it works
On page load, multiple JSON files are fetched in parallel using `Promise.all`.
When the user clicks the button, a random item is selected from each category and rendered into the UI by updating the image and name.

## Running the project
Because the project uses `fetch`, it needs to be run on a local server.