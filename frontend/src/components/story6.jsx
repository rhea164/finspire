import React, { useState } from 'react';
import './story6.css';
import zeeshan from '../assets/zeeshan6.png';

function Story6() {
  const [showHint, setShowHint] = useState(false); // track if hint is visible
  const hintText = "Letting it run can feel lucky, but keeping your balance is how you stay in the game long-term.";
  return (
    
    <div className="story-container">
      <h1 className="title">LOCKING GOOD HABITS</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            Year-end. Time to set future Zeeshan up for wins.
          </p>
          <button>Move money into a cheaper fund — keep more of the gains</button>
          <button>Turn on automatic monthly buys — good habits on auto-pilot</button>
          <button>Take out half for a big purchase — fun now, slower growth later</button>
        </div>
      </div>
      <div className="hint-container">
        <button
          className="hint-button"
          onClick={() => setShowHint(prev => !prev)}
        >
          Hint!
        </button>
        {showHint && (
          <div className="hint-box">
            {hintText}
          </div>
        )}
      </div>
    </div>
  );
}

export default Story6;
