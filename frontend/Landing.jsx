// components/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const topics = ['Stocks', 'Commodities', 'Cryptocurrency'];

  const handleTopicClick = (topic) => {
    // You can pass the selected topic to the Avatar page if needed
    navigate('/avatar', { state: { selectedTopic: topic } });
  };

  return (
    <div className="landing-container">
      <h1 className="Topic">CHOOSE YOUR TOPIC</h1>
      <div className="Buttons">
        {topics.map((topic, index) => (
          <button 
            key={index} 
            onClick={() => handleTopicClick(topic)}
            className="topic-button"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Landing;
