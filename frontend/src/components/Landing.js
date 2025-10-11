import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import reload_icon from '../assets/Vector.png';
import mic_icon from '../assets/Vector1.png';

function Landing() {
  const navigate = useNavigate();
  
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
    const shuffled = [...allTopics].sort(() => 0.5 - Math.random());
    setTopics(shuffled.slice(0, 3));
  };

  // Function to handle topic button click
  const handleTopicClick = (topic) => {
    navigate('/avatar', { state: { selectedTopic: topic } });
  };

  // Function to handle microphone button click
  const handleMicrophoneClick = () => {
    navigate('/avatar', { state: { selectedTopic: 'Voice Selection' } });
  };

  return (
    <div className="landing-container">
      <h1 className="Topic">CHOOSE YOUR TOPIC</h1>

      <div className="Buttons">
        {topics.map((topic, index) => (
          <button 
            key={index}
            onClick={() => handleTopicClick(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="button-row">
        <button 
          className="microphone-button" 
          onClick={handleMicrophoneClick}
        >
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