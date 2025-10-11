import React from 'react';
import './journey.css';
import avatarStanding from '../assets/zeeshan1.png'; 

const Journey = () => {
  return (
    <div className="journey-container">
      <h2 className="journey-title">START YOUR JOURNEY!</h2>
      <div className="journey-content">
        <img src={avatarStanding} alt="Avatar" className="avatar" />
        <p className="journey-text">
          Zeeshan just got a bonus and a timeline full of “AI to the moon” posts. 
          He has got AED 10,000, a mix of FOMO and ambition, and friends split between hype and caution. 
          This year, he will find out if a plan can beat the noise!
        </p>
      </div>
      <button className="continue-button">Continue</button>
    </div>
  );
};

export default Journey;
