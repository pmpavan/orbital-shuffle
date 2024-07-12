import React, { useState } from 'react';
import './EntryPage.css';

function EntryPage({ onStartGame }) {
  const [gridSize, setGridSize] = useState(4);
  const [winCount, setWinCount] = useState(4);
  const [difficulty, setDifficulty] = useState('easy');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartClick = () => {
    if (winCount > gridSize) {
      setErrorMessage('Win count cannot be greater than grid size.');
      return;
    }

    const typeMultiplier = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
    const maxStepsMultiplier = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 2 : 1;
    onStartGame(gridSize, winCount, typeMultiplier, maxStepsMultiplier);
  };

  return (
    <div className="entry-page">
      <h1>Welcome to Orbital Shuffle!</h1>
      <p>Rules: The objective is to align {winCount} adjacent matching planets to win the game. Choose your grid size and difficulty mode.</p>
      
      <label>
        Grid Size:
        <input type="number" value={gridSize} onChange={(e) => setGridSize(parseInt(e.target.value, 10))} min="3" max="10" />
      </label>
      
      <label>
        Win Count:
        <input type="number" value={winCount} onChange={(e) => setWinCount(parseInt(e.target.value, 10))} min="3" max={gridSize} />
      </label>

      <label>
        Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <button onClick={handleStartClick}>Start Game</button>
    </div>
  );
}

export default EntryPage;
