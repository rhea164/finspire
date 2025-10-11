import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);
  const [userChoices, setUserChoices] = useState([]);

  const addPoints = (points, choice, storyName) => {
    setScore(prev => prev + points);
    setUserChoices(prev => [
      ...prev, 
      { story: storyName, choice, points, timestamp: new Date().toISOString() }
    ]);
  };

  const resetScore = () => {
    setScore(0);
    setUserChoices([]);
  };

  return (
    <ScoreContext.Provider value={{ score, userChoices, addPoints, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}