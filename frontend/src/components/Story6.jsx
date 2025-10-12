import React, { useState } from 'react';
import './story6.css';
import zeeshan from '../assets/zeeshan6.png';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../context/StoreContext';

function Story6() {
  const [showHint, setShowHint] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const { addPoints } = useScore();

  const handleChoice = (choiceText, points) => {
    // Add points based on the choice
    addPoints(points, choiceText, "Locking Good Habits - Automation");
    
    // Navigate to the summary page
    navigate('/summary');
  };

  const choices = [
    { 
      text: "Move money into a cheaper fund — keep more of the gains", 
      points: 5  // Partially correct - cost efficiency but not habit building
    },
    { 
      text: "Turn on automatic monthly buys — good habits on auto-pilot", 
      points: 10  // Correct choice - automation builds discipline
    },
    { 
      text: "Take out half for a big purchase — fun now, slower growth later", 
      points: 0  // Wrong choice - undermines long-term goals
    }
  ];

  const hintText = "Letting it run can feel lucky, but keeping your balance is how you stay in the game long-term.";

  return (
    <div className="story-container">
      <h1 className="title">LOCKING GOOD HABITS</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            Year-end. Time to set future Zeeshan up for wins.
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

export default Story6;
