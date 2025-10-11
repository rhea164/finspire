import React, { useState } from 'react';
import './story6.css';
import zeeshan from '../assets/zeeshan6.png';

function Story6() {
  return (
    <div className="story-container">
      <h1 className="title">LOCKING GOOD HABITS</h1>
      <div className="avatar">
        <img src={zeeshan} alt="Zeeshan" />
        <div className="text-and-buttons">
          <p className="text">
            Year-end. Time to set future Zeeshan up for wins.
          </p>
          <button>Move money into a cheaper fund — keep more of the gains</button>
          <button>Turn on automatic monthly buys — good habits on auto-pilot</button>
          <button>Take out half for a big purchase — fun now, slower growth later</button>
        </div>
      </div>
    </div>
  );
}

export default Story6;