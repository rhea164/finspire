import React, { useState } from 'react';
import './Landing.css';
import reload_icon from '../assets/Vector.png';
import mic_icon from '../assets/Vector1.png';

function Landing() {
  // Array of possible topics
  const allTopics = [
    'Stocks',
    'Commodities',
    'Cryptocurrency',
    'Real Estate',
    'Forex',
    'Bonds',
    'Mutual Funds',
    'ETFs',
    'Derivatives',
    'Options'
  ];

  // State for currently displayed topics
  const [topics, setTopics] = useState([
    'Stocks',
    'Commodities',
    'Cryptocurrency'
  ]);

  // Function to generate 3 random topics
  const generateTopics = () => {
    const shuffled = [...allTopics].sort(() => 0.5 - Math.random()); // shuffle array
    setTopics(shuffled.slice(0, 3)); // take first 3
  };

  return (
    <div className="landing-container">
      <h1 className="Topic">CHOOSE YOUR TOPIC</h1>

      <div className="Buttons">
        {topics.map((topic, index) => (
          <button key={index}>
            {topic}
          </button>
        ))}
      </div>

      <div className="button-row">
        <button className="microphone-button">
          <img src={mic_icon} alt="microphone" />
        </button>
        <button className="reload-button" onClick={generateTopics}>
          <img src={reload_icon} alt="Reload Topics" />
        </button>
      </div>
    </div>
  );
}

export default Landing;
