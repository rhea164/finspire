import React, { useState } from 'react';
import './story2.css';
import zeeshan from '../assets/zeeshan3.png';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../context/StoreContext'

function Story2() {
  const [showHint, setShowHint] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const { addPoints } = useScore();

  const handleChoice = (choiceText, points) => {
    // Add points based on the choice
    addPoints(points, choiceText, "How Much Now - Dollar Cost Averaging");
    
    // Navigate to the next story
    navigate('/story3');
  };

  const choices = [
    { 
      text: "All the money today — feels bold, can sting", 
      points: 0  // Wrong choice - lump sum investing
    },
    { 
      text: "Small chunks over time — buys a little each week", 
      points: 10  // Correct choice - dollar cost averaging
    },
    { 
      text: "Two chunks: now and next month — smoother than all at once", 
      points: 5  // Partially correct - better than lump sum but not optimal DCA
    }
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
          {choices.map((choice, index) => (
            <button 
              key={index}
              onClick={() => handleChoice(choice.text, choice.points)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={hoveredIndex === index ? 'hovered' : ''}
            >
              {choice.text}
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
