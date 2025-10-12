import React, { useState } from 'react';
import './story3.css';
import zeeshan from '../assets/zeeshan4.png';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../context/StoreContext';

function Story3() {
  const [showHint, setShowHint] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const { addPoints } = useScore();

  const handleChoice = (choiceText, points) => {
    // Add points based on the choice
    addPoints(points, choiceText, "The First Drop - Risk Management");
    
    // Navigate to the next story
    navigate('/story4');
  };

  const choices = [
    { 
      text: "Buy more without thinking — just vibes", 
      points: 0  // Wrong choice - emotional investing
    },
    { 
      text: "Recheck the reason, then add a small amount — brain on, not off", 
      points: 5  // Partially correct - some analysis but still buying
    },
    { 
      text: "Pause and watch for a few weeks — patience, but don't forget it", 
      points: 10  // Correct choice - disciplined approach
    }
  ];

  const hintText = "Letting it run can feel lucky, but keeping your balance is how you stay in the game long-term.";

  return (
    <div className="story-container">
      <h1 className="title">THE FIRST DROP</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            Price falls 8% in a week. Heart drops with it. What now?
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

export default Story3;
