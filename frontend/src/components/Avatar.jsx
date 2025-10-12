// components/Avatar.jsx
import React, { useState } from 'react';
import './Avatar.css';
import zeeshan from '../assets/zeeshan.png';
import rhea from '../assets/rhea.png';
import kanch from '../assets/kanch.png';
import tams from '../assets/tams.png'
import lak from '../assets/lak.png'
import vansh from '../assets/vansh.png'
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  const avatars = [
    { src: zeeshan, className: 'z' },
    { src: rhea, className: 'r' },
    { src: kanch, className: 'k' },
    { src: tams, className: 't' },
    { src: lak, className: 'l' },
    { src: vansh, className: 'v' }
  ];

  const handleSubmit = () => {
    navigate('/journey');
  }

  return (
    <div className="avatar-container">
      <h1 className="avatar">SELECT YOUR AVATAR</h1>
       <div className="avatars">
        {avatars.map((avatar, index) => (
          <img 
            key={index}
            className={`${avatar.className} ${selectedAvatar === index ? 'selected' : ''}`}
            src={avatar.src}
            onClick={() => setSelectedAvatar(index)}
          ></img>
        ))}
       </div>
     <button 
     onClick={() => handleSubmit()}>Confirm</button>
     </div>
   );
}

export default Avatar;
