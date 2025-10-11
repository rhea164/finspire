import React from "react";
import "./summary.css";
import { useNavigate } from 'react-router-dom';


//Sample data - Can later be replaced with StockGro Data
const summaryData = {
  episodeTitle: "Investor Mode: Summary Unlocked!",
  wentWell: [
    "Understood the basics of stock market investing",
    "Applied diversification strategies effectively",
    "Learned how market trends affect stock prices"
  ],
  couldBeBetter: [
    "Research individual companies more thoroughly before investing",
    "Monitor portfolio performance regularly",
    "Consider long-term investment strategies instead of short-term speculation"
  ],
  keyLessons: [
    "Diversification reduces risk in a portfolio",
    "Research and analysis are crucial before buying stocks",
    "Investing requires patience and understanding of market fluctuations"
  ]
};


const Summary = () => {
  const navigate = useNavigate();

  const handleNextEpisode = () => {
    // Navigate to the next episode or main menu
    navigate('/'); // Replace '/mainmenu' with the actual path you want to navigate to
  };
  return (
    <div className="summary-container">
      <h1 className="summary-title">{summaryData.episodeTitle}</h1>

      <section className="summary-section">
        <h2>What Went Well:</h2>
        <ul>
          {summaryData.wentWell.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="summary-section">
        <h2>What Could Be Better:</h2>
        <ul>
          {summaryData.couldBeBetter.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="summary-section">
        <h2>Key Lessons Learned:</h2>
        <ul>
          {summaryData.keyLessons.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <button className="next-episode-btn"
        onClick={handleNextEpisode}
      >Go to Next Episode</button>
    </div>
  );
};

export default Summary;
