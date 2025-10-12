import React, { useEffect, useState } from 'react';
import './journey.css';
import avatarStanding from '../assets/avatar_standing.png'; // Adjust path as needed

const BuzzTesla = () => {
  const [tesla, setTesla] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call Flask backend which fetches from StockGro securely
    fetch('http://localhost:5001/api/tesla')
      .then(res => res.json())
      .then(data => {
        // Adapt below line if Flask returns more/less nesting
        const info = data?.data?.sections?.[0]?.data || {};
        setTesla(info);
        setLoading(false);
      })
      .catch(() => {
        setTesla(null);
        setLoading(false);
      });
  }, []);

  return (
    <div className="journey-container">
      <h2 className="journey-title">THE BUZZZ...</h2>
      <div className="journey-content">
        <img src={avatarStanding} alt="Avatar" className="avatar" />
        <div className="journey-text" style={{ fontSize: '1.25em', fontWeight: 430 }}>
          {loading ? (
            <>Zeeshan picks Tesla — loading today’s price and stats...</>
          ) : tesla ? (
            <>
              Zeeshan picks Tesla — its up <b>{tesla.percentagechange}%</b> today, let’s see how it goes
              <br /><br />
              Tesla designs and sells electric vehicles and energy solutions. Tesla aims to accelerate the world’s transition to clean energy.
              <br /><br />
              Tesla has a share price of <b>${tesla.ltp}</b> and a market cap of <b>${Number(tesla.marketcap).toLocaleString(undefined, {maximumFractionDigits: 2})}</b>.
            </>
          ) : (
            <>Unable to load Tesla data right now.</>
          )}
        </div>
      </div>
      <button className="continue-button">Continue</button>
    </div>
  );
};

export default BuzzTesla;
