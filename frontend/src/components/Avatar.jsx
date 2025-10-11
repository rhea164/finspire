// components/Avatar.jsx
import React from 'react';
import './Avatar.css';
import zeeshan from '../assets/zeeshan.png';
import rhea from '../assets/rhea.png';
import kanch from '../assets/kanch.png';
import tams from '../assets/tams.png'
import lak from '../assets/lak.png'
import vansh from '../assets/vansh.png'

function Avatar() {

  return (
    <div className="avatar-container">
      <h1 className="avatar">SELECT YOUR AVATAR</h1>

      <div className="avatars">
        <img className="z"src={zeeshan}></img>
        <img className="r"src={rhea}></img>
        <img className="k"src={kanch}></img>
        <img className="t" src={tams}></img>
        <img className="l"src={lak}></img>
        <img className="v"src={vansh}></img>
      </div>
    <button>Confirm</button>
    </div>
  );
}

export default Avatar;
