import React from 'react';
import './FailureDialog.css';

function FailureDialog({ onDismiss, stepsTaken }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h1>
          <span role="img" aria-label="crying face">😢</span> Game Over! <span role="img" aria-label="crying face">😢</span>
        </h1>
        <p>Oh no! You took {stepsTaken} steps. Try again!</p>
        <button onClick={onDismiss}>Try Again</button>
      </div>
    </div>
  );
}

export default FailureDialog;
