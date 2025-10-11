import React, { useState } from 'react';
import './story3.css';
import zeeshan from '../assets/zeeshan4.png';
import { useNavigate } from 'react-router-dom';

function Story3() {
  const [showHint, setShowHint] = useState(false); // track if hint is visible
  const hintText = "Letting it run can feel lucky, but keeping your balance is how you stay in the game long-term.";
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/story4'); // Replace '/nextpage' with the actual path you want to navigate to
  }

  const buttons = [
    "Move money into a cheaper fund — keep more of the gains",
    "Turn on automatic monthly buys — good habits on auto-pilot",
    "Take out half for a big purchase — fun now, slower growth later"
  ];
  return (
    <div className="story-container">
      <h1 className="title">THE FIRST DROP</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            Price falls 8% in a week. Heart drops with it. What now?
          </p>
          {buttons.map((btnText, i) => (
            <button key={i} onClick={() => handleSubmit()}>
              {btnText}
            </button>
          ))
        }
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