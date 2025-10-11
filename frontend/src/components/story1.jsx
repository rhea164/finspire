import React, { useState } from 'react';
import './story1.css';
import zeeshan from '../assets/zeeshan2.png';
import { useNavigate } from 'react-router-dom';

function Story1() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/story2'); // Replace '/nextpage' with the actual path you want to navigate to
  }

  return (
    <div className="story-container">
      <h1 className="title">THE BUZZ...</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            News is loud. Friends are louder. Zeeshan has AED 10,000 and an itchy buy finger.
          </p>
          <button onClick={() => handleSubmit()} >One hot stock — all eggs in one basket.</button>
          <button onClick={() => handleSubmit()}>A basket of many stocks — spreads risk.</button>
          <button onClick={() => handleSubmit()}>Half hot stock, half basket — a bit wild, a bit safe.</button>
        </div>
      </div>
    </div>
  );
}

export default Story1;
