import React from 'react';
import './story6.css';
import zeeshan from '../assets/zeeshan6.png';
import { useNavigate } from 'react-router-dom';

function Story6() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/summary'); // Replace '/nextpage' with the actual path you want to navigate to
  }
  const buttons = [
    "Move money into a cheaper fund — keep more of the gains",
    "Turn on automatic monthly buys — good habits on auto-pilot",
    "Take out half for a big purchase — fun now, slower growth later"
  ];
  return (
    <div className="story-container">
      <h1 className="title">LOCKING GOOD HABITS</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            Year-end. Time to set future Zeeshan up for wins.
          </p>
          {buttons.map((btnText, i) => (
            <button key={i} onClick={() => handleSubmit()}>
              {btnText}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Story6;