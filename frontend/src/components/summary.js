import React from "react";
import "./summary.css";
import { useNavigate } from 'react-router-dom';
import { useScore } from '../context/StoreContext';

const Summary = () => {
  const navigate = useNavigate();
  const { score, userChoices, resetScore } = useScore();

  // Calculate financial knowledge level based on score
  const getFinancialLevel = () => {
    const totalPossible = 50; // 5 stories × 10 points each
    const percentage = (score / totalPossible) * 100;

    if (percentage >= 90) return { level: "Financial Guru 🏆", color: "#4CAF50" };
    if (percentage >= 80) return { level: "Investment Pro 💼", color: "#2196F3" };
    if (percentage >= 70) return { level: "Smart Investor 📈", color: "#FF9800" };
    if (percentage >= 60) return { level: "Learning Fast 📚", color: "#9C27B0" };
    return { level: "Getting Started 🌱", color: "#F44336" };
  };

  const getPersonalizedFeedback = () => {
    const percentage = (score / 50) * 100;
    
    if (percentage >= 80) {
      return "Excellent! You demonstrate strong financial literacy and make wise investment decisions.";
    } else if (percentage >= 60) {
      return "Good job! You understand key financial concepts but can improve in some areas.";
    } else {
      return "Keep learning! Financial knowledge is a journey - you're on the right path.";
    }
  };

  const financialLevel = getFinancialLevel();
  const personalizedFeedback = getPersonalizedFeedback();

  const handleNextEpisode = () => {
    resetScore(); // Reset score for next playthrough
    navigate('/'); // Navigate to home
  };

  const handlePlayAgain = () => {
    resetScore(); // Reset score
    navigate('/story-options'); // Start from story selection
  };

  return (
    <div className="summary-container">
      <h1 className="summary-title">Financial Journey Complete! 🎉</h1>

      {/* Score Display Section */}
      <section className="score-section">
        <div className="score-card">
          <div className="score-circle" style={{ borderColor: financialLevel.color }}>
            <span className="score-number">{score}</span>
            <span className="score-label">/ 50 Points</span>
          </div>
          <div className="level-badge" style={{ backgroundColor: financialLevel.color }}>
            {financialLevel.level}
          </div>
        </div>
        <p className="feedback-text">{personalizedFeedback}</p>
      </section>

      {/* Your Choices Section */}
      <section className="choices-section">
        <h2>Your Investment Decisions</h2>
        <div className="choices-list">
          {userChoices.map((choice, index) => (
            <div key={index} className="choice-item">
              <div className="choice-header">
                <span className="choice-story">{choice.story}</span>
                <span className={`choice-points ${choice.points > 0 ? 'positive' : 'neutral'}`}>
                  +{choice.points} pts
                </span>
              </div>
              <p className="choice-text">{choice.choice}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Lessons Section */}
      <section className="summary-section">
        <h2>Key Financial Principles You Applied:</h2>
        <ul>
          <li>✅ <strong>Diversification</strong> - Spreading investments to manage risk</li>
          <li>✅ <strong>Dollar Cost Averaging</strong> - Investing regularly over time</li>
          <li>✅ <strong>Portfolio Rebalancing</strong> - Maintaining target allocations</li>
          <li>✅ <strong>Automated Investing</strong> - Building consistent financial habits</li>
          <li>✅ <strong>Risk Management</strong> - Making informed decisions during market changes</li>
        </ul>
      </section>

      {/* Areas for Improvement */}
      <section className="summary-section">
        <h2>Continue Your Financial Education:</h2>
        <ul>
          <li>📖 Learn about different asset classes (bonds, real estate, commodities)</li>
          <li>💡 Understand tax-efficient investing strategies</li>
          <li>🔍 Research individual companies and industries</li>
          <li>📊 Monitor economic indicators and market trends</li>
          <li>🎯 Set clear long-term financial goals</li>
        </ul>
      </section>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="play-again-btn" onClick={handlePlayAgain}>
          Play Again
        </button>
        <button className="next-episode-btn" onClick={handleNextEpisode}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Summary;