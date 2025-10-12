import React, { useState } from 'react';
import './story4.css';
import zeeshan from '../assets/zeeshan5.png';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../context/StoreContext';

function Story4() {
  const [showHint, setShowHint] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const { addPoints } = useScore();

  const handleChoice = (choiceText, points) => {
    // Add points based on the choice
    addPoints(points, choiceText, "The Quiet Creep - Portfolio Rebalancing");
    
    // Navigate to the next story
    navigate('/story6');
  };

  const choices = [
    { 
      text: "Let it ride — hope it keeps winning", 
      points: 0  // Wrong choice - no rebalancing, high risk
    },
    { 
      text: "Trim it back to your target mix — keep balance", 
      points: 10  // Correct choice - proper portfolio rebalancing
    },
    { 
      text: "Trim only if it gets too huge — soft guardrail", 
      points: 5  // Partially correct - better than nothing but not systematic
    }
  ];

  const hintText = "Letting it run can feel lucky, but keeping your balance is how you stay in the game long-term.";

  return (
    <div className="story-container">
      <h1 className="title">THE QUIET CREEP</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            Months pass. One pick is now way bigger than the rest.
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

export default Story4;
