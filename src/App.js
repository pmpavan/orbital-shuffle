import React, { useState, useEffect } from 'react';
import './App.css';
import PlanetGrid from './PlanetGrid';
import WinDialog from './WinDialog';
import FailureDialog from './FailureDialog';
import EntryPage from './EntryPage';

const generatePlanets = (gridSize, typeMultiplier) => {
  const types = ['planet', 'asteroid', 'wormhole', 'supernova'].slice(0, gridSize * typeMultiplier);
  
  let planets;
  do {
    planets = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      planets.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
  } while (hasWinningLine(planets, gridSize, 3));
  
  return planets;
};

const hasWinningLine = (planets, gridSize, winCount) => {
  const checkLine = (line) => {
    return line.length >= winCount && line.every((planet) => planet.type === line[0].type);
  };

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const horizontal = [];
      const vertical = [];
      const diagonal1 = [];
      const diagonal2 = [];

      for (let k = 0; k < winCount; k++) {
        if (i + k < gridSize) vertical.push(planets[(i + k) * gridSize + j]);
        if (j + k < gridSize) horizontal.push(planets[i * gridSize + j + k]);
        if (i + k < gridSize && j + k < gridSize)
          diagonal1.push(planets[(i + k) * gridSize + j + k]);
        if (i + k < gridSize && j - k >= 0)
          diagonal2.push(planets[(i + k) * gridSize + j - k]);
      }

      if (
        checkLine(horizontal) ||
        checkLine(vertical) ||
        checkLine(diagonal1) ||
        checkLine(diagonal2)
      ) {
        return true;
      }
    }
  }

  return false;
};

const checkWinCondition = (planets, winCount, gridSize) => {
  const checkLine = (line) => {
    return line.length >= winCount && line.every((planet) => planet.type === line[0].type);
  };

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const horizontal = [];
      const vertical = [];
      const diagonal1 = [];
      const diagonal2 = [];

      for (let k = 0; k < winCount; k++) {
        if (i + k < gridSize) vertical.push(planets[(i + k) * gridSize + j]);
        if (j + k < gridSize) horizontal.push(planets[i * gridSize + j + k]);
        if (i + k < gridSize && j + k < gridSize)
          diagonal1.push(planets[(i + k) * gridSize + j + k]);
        if (i + k < gridSize && j - k >= 0)
          diagonal2.push(planets[(i + k) * gridSize + j - k]);
      }

      if (
        checkLine(horizontal) ||
        checkLine(vertical) ||
        checkLine(diagonal1) ||
        checkLine(diagonal2)
      ) {
        return true;
      }
    }
  }

  return false;
};

const calculateMinSteps = (planets, winCount, gridSize) => {
  const isWinCondition = (planets) => {
    const checkLine = (line) => {
      return line.length >= winCount && line.every((planet) => planet.type === line[0].type);
    };

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const horizontal = [];
        const vertical = [];
        const diagonal1 = [];
        const diagonal2 = [];

        for (let k = 0; k < winCount; k++) {
          if (i + k < gridSize) vertical.push(planets[(i + k) * gridSize + j]);
          if (j + k < gridSize) horizontal.push(planets[i * gridSize + j + k]);
          if (i + k < gridSize && j + k < gridSize)
            diagonal1.push(planets[(i + k) * gridSize + j + k]);
          if (i + k < gridSize && j - k >= 0)
            diagonal2.push(planets[(i + k) * gridSize + j - k]);
        }

        if (
          checkLine(horizontal) ||
          checkLine(vertical) ||
          checkLine(diagonal1) ||
          checkLine(diagonal2)
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const swapPlanets = (planets, idx1, idx2) => {
    const newPlanets = [...planets];
    [newPlanets[idx1], newPlanets[idx2]] = [newPlanets[idx2], newPlanets[idx1]];
    return newPlanets;
  };

  const bfs = () => {
    const queue = [];
    const visited = new Set();
    queue.push({ planets, steps: 0 });
    visited.add(JSON.stringify(planets));

    while (queue.length > 0) {
      const { planets: currentPlanets, steps } = queue.shift();

      if (isWinCondition(currentPlanets)) {
        return steps;
      }

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const idx1 = i * gridSize + j;
          const neighbors = [
            [i + 1, j],
            [i - 1, j],
            [i, j + 1],
            [i, j - 1],
          ];

          neighbors.forEach(([ni, nj]) => {
            if (ni >= 0 && ni < gridSize && nj >= 0 && nj < gridSize) {
              const idx2 = ni * gridSize + nj;
              const newPlanets = swapPlanets(currentPlanets, idx1, idx2);
              const newPlanetsStr = JSON.stringify(newPlanets);

              if (!visited.has(newPlanetsStr)) {
                visited.add(newPlanetsStr);
                queue.push({ planets: newPlanets, steps: steps + 1 });
              }
            }
          });
        }
      }
    }

    return Infinity; // If no solution is found
  };

  return bfs();
};

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gridSize, setGridSize] = useState(4);
  const [winCount, setWinCount] = useState(4);
  const [typeMultiplier, setTypeMultiplier] = useState(2);
  const [maxStepsMultiplier, setMaxStepsMultiplier] = useState(2);
  const [planets, setPlanets] = useState([]);
  const [gameState, setGameState] = useState('ONGOING');
  const [stepsTaken, setStepsTaken] = useState(0);
  const [minSteps, setMinSteps] = useState(0);

  useEffect(() => {
    if (isGameStarted) {
      const initialPlanets = generatePlanets(gridSize, typeMultiplier);
      setPlanets(initialPlanets);
      const minStepsCalculated = calculateMinSteps(initialPlanets, winCount, gridSize);
      setMinSteps(minStepsCalculated);
    }
  }, [isGameStarted, gridSize, winCount, typeMultiplier]);

  const handleStartGame = (gridSize, winCount, typeMultiplier, maxStepsMultiplier) => {
    if (winCount > gridSize) {
      alert('Win count cannot be greater than grid size.');
      return;
    }
    setGridSize(gridSize);
    setWinCount(winCount);
    setTypeMultiplier(typeMultiplier);
    setMaxStepsMultiplier(maxStepsMultiplier);
    setIsGameStarted(true);
  };

  const maxStepsAllowed = minSteps * maxStepsMultiplier;

  const swapPlanets = (planet1, planet2) => {
    const newPlanets = [...planets];
    const index1 = newPlanets.indexOf(planet1);
    const index2 = newPlanets.indexOf(planet2);
    [newPlanets[index1], newPlanets[index2]] = [newPlanets[index2], newPlanets[index1]];
    setPlanets(newPlanets);
    setStepsTaken(stepsTaken + 1);

    if (checkWinCondition(newPlanets, winCount, gridSize)) {
      setGameState('WON');
    } else if (stepsTaken + 1 > maxStepsAllowed) {
      setGameState('FAILED');
    }
  };

  const resetGame = () => {
    const initialPlanets = generatePlanets(gridSize, typeMultiplier);
    setPlanets(initialPlanets);
    setStepsTaken(0);
    setGameState('ONGOING');
    const minStepsCalculated = calculateMinSteps(initialPlanets, winCount, gridSize);
    setMinSteps(minStepsCalculated);
  };

  return (
    <div className="App">
      {!isGameStarted ? (
        <EntryPage onStartGame={handleStartGame} />
      ) : (
        <>
          {gameState === 'WON' && <WinDialog onDismiss={resetGame} stepsTaken={stepsTaken} />}
          {gameState === 'FAILED' && <FailureDialog onDismiss={resetGame} stepsTaken={stepsTaken} />}
          <PlanetGrid planets={planets} onPlanetSwap={swapPlanets} gridSize={gridSize} />
        </>
      )}
    </div>
  );
}

export default App;
