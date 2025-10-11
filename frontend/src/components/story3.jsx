import React, { useState } from 'react';
import './story3.css';
import zeeshan from '../assets/zeeshan4.png';

function Story3() {
  const [showHint, setShowHint] = useState(false); // track if hint is visible
  const hintText = "Letting it run can feel lucky, but keeping your balance is how you stay in the game long-term.";
  return (
    <div className="story-container">
      <h1 className="title">THE FIRST DROP</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            Price falls 8% in a week. Heart drops with it. What now?
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

export default Story3;