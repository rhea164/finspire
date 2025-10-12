import React from 'react';
import './journey.css';
import avatarStanding from '../assets/zeeshan1.png'; 
import { useNavigate } from 'react-router-dom';

const Journey = () => {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate('/story1');
  };
  return (
    <div className="journey-container">
      <h2 className="journey-title">START YOUR JOURNEY!</h2>
      <div className="journey-content">
        <div className="avatar">
          <img src={avatarStanding} alt="Avatar"/>
        </div>
        <p className="journey-text">
          Zeeshan just got a bonus and a timeline full of “AI to the moon” posts. 
          He has got AED 10,000, a mix of FOMO and ambition, and friends split between hype and caution. 
          This year, he will find out if a plan can beat the noise!
        </p>
      </div>
      <button onClick={handleContinue}
      className="continue-button">Continue</button>
    </div>
  );
};

export default Journey;
