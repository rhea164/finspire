import React, { useState } from 'react';
import './story1.css';
import zeeshan from '../assets/zeeshan2.png';

function Story1() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const buttons = [
    "One hot stock — all eggs in one basket.",
    "A basket of many stocks — spreads risk.",
    "Half hot stock, half basket — a bit wild, a bit safe."
  ];

  const hoverTexts = [
    "Info about hot stock",
    "Info about basket risk",
    "Info about mixed strategy"
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
          {buttons.map((btnText, i) => (
            <button 
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
    
              {hoveredIndex === i ? hoverTexts[i] : btnText}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Story1;