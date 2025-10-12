import React, { useState } from 'react';
import './story1.css';
import zeeshan from '../assets/zeeshan2.png';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../context/StoreContext'

function Story1() {
  const [showHint, setShowHint] = useState(false); // track if hint is visible
  const hintText = "Letting it run can feel lucky, but keeping your balance is how you stay in the game long-term.";
  const navigate = useNavigate();
  const { addPoints } = useScore();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  

  const handleSubmit = () => {
    navigate('/story2'); // Replace '/nextpage' with the actual path you want to navigate to
  }
  const handleChoice = (choiceText, points) => {
    // Add points based on the choice
    addPoints(points, choiceText, "The Buzz - Diversification");
    
    // Navigate to the next story
    navigate('/story2');
  };

  const choices = [
    { 
      text: "One hot stock — all eggs in one basket.", 
      points: 0  // Wrong choice
    },
    { 
      text: "A basket of many stocks — spreads risk.", 
      points: 10  // Correct choice
    },
    { 
      text: "Half hot stock, half basket — a bit wild, a bit safe.", 
      points: 5  // Partially correct
    }
  ];

  return (
    <div className="story-container">
      <h1 className="title">THE BUZZ...</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            News is loud. Friends are louder. Zeeshan has AED 10,000 and an itchy buy finger.
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

export default Story1;
