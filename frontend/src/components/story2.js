import React, { useState } from 'react';
import './story2.css';
import zeeshan from '../assets/zeeshan3.png';
import { useNavigate } from 'react-router-dom';

function Story2() {
  const [showHint, setShowHint] = useState(false); // track if hint is visible
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/story3'); // Replace '/nextpage' with the actual path you want to navigate to
  }

  const buttons = [
    "All the money today — feels bold, can sting",
    "Small chunks over time — buys a little each week",
    "Two chunks: now and next month — smoother than all at once"
  ];

  const hintText = "Going all in might sting, and splitting in two can still surprise you, sometimes steady steps win the race.";

  return (
    <div className="story-container">
      <h1 className="title">HOW MUCH NOW?</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            He is on the buy screen. How fast does he jump in?

          </p>
          {buttons.map((btnText, i) => (
            <button key={i} onClick={() => handleSubmit()}>
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

export default Story2;
