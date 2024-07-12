# Orbital Shuffle

Orbital Shuffle is a fun and engaging puzzle game designed for kids. The objective is to align a specified number of adjacent matching planets to win the game. 

## Play the Game

You can play the game online [here](https://pmpavan.github.io/orbital-shuffle/).

## How to Play

1. **Start the Game:**
   - Click on the "Start Game" button on the entry page.
   - Choose the grid size, win count, and difficulty level (easy, medium, hard).
   - Click "Start Game" to begin.

2. **Game Objective:**
   - The goal is to align the specified number of adjacent matching planets either horizontally, vertically, or diagonally.

3. **Swap Planets:**
   - Click on two adjacent planets to swap them. Only adjacent planets can be swapped.

4. **Win the Game:**
   - If you align the specified number of adjacent matching planets, you win the game and a win dialog will appear.

5. **Game Over:**
   - If you exceed the maximum allowed steps without winning, the game will be over and a failure dialog will appear.

## Installation

To run the game locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/pmpavan/orbital-shuffle.git
   cd orbital-shuffle
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Game:**
   ```bash
   npm start
   ```

4. **Build and Deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

## Project Structure

- `src`: Contains the source code for the game.
  - `App.js`: Main component that manages the game state.
  - `EntryPage.js`: Entry page component where users can select game settings.
  - `PlanetGrid.js`: Component that displays the game grid.
  - `PlanetView.js`: Component that displays each planet.
  - `WinDialog.js`: Component that displays the win dialog.
  - `FailureDialog.js`: Component that displays the failure dialog.
- `public`: Contains static files such as images and the `index.html` file.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- GitHub Pages: A static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub.

## Credits

This game was developed by Pavan. If you have any questions or suggestions, feel free to reach out.
