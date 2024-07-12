import React from 'react';
import './WinDialog.css';

function WinDialog({ onDismiss, stepsTaken }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h1>
          <span role="img" aria-label="party popper">🎉</span> You Won! <span role="img" aria-label="party popper">🎉</span>
        </h1>
        <p>Great job! You completed the game in {stepsTaken} steps.</p>
        <button onClick={onDismiss}>Play Again</button>
      </div>
    </div>
  );
}

export default WinDialog;
