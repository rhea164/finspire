// components/Avatar.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Avatar.css';

function Avatar() {
  const location = useLocation();
  const selectedTopic = location.state?.selectedTopic || 'No topic selected';

  return (
    <div className="avatar-container">
      <h1>Avatar Page</h1>
      <p>Selected Topic: {selectedTopic}</p>
      
      {/* Add your avatar content here */}
      <div className="avatar-content">
        {/* Your avatar component content */}
      </div>
    </div>
  );
}

export default Avatar;