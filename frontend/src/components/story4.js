import React, { useState } from 'react';
import './story4.css';
import zeeshan from '../assets/zeeshan5.png';

function Story4() {
  const [showHint, setShowHint] = useState(false); // track if hint is visible

  const buttons = [
    "Let it ride — hope it keeps winning",
    "Trim it back to your target mix — keep balance",
    "Trim only if it gets too huge — soft guardrail"
  ];

  const hintText = "Letting it run can feel lucky, but keeping your balance is how you stay in the game long-term.";

  return (
    <div className="story-container">
      <h1 className="title">THE QUIET CREEP</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            Months pass. One pick is now way bigger than the rest.
          </p>
          {buttons.map((btnText, i) => (
            <button key={i}>
              {btnText}
            </button>
          ))}
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

export default Story4;
