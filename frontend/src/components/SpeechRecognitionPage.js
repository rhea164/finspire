// components/SpeechRecognitionPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SpeechRecognitionPage.css";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function SpeechRecognitionPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const [showPlayButton, setShowPlayButton] = useState(false);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser");
      return;
    }

    // Initialize recognition once
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      console.log("Speech recognition result received");
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setIsListening(false);

      // Send transcript to backend for keyword extraction
      fetch("http://localhost:5001/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
      })
        .then((res) => res.json())
        .then((data) => setKeywords(data.keywords))
        .catch((err) => {
          console.error("Backend fetch error:", err);
          setError("Failed to extract keywords");
        });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
    };

     recognition.onresult = async (event) => {
    console.log("Speech recognition result received");
    const transcript = event.results[0][0].transcript;
    setText(transcript);
    setIsListening(false);

    try {
      console.log("Sending to backend:", transcript);
      
      const response = await fetch("http://localhost:5001/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);
      
      setKeywords(data.keywords);
      setError("");
      setShowPlayButton(true); // Show the play button after keywords are detected
      
    } catch (err) {
      console.error("Backend fetch error:", err);
      setError(`Failed to extract keywords: ${err.message}`);
      // Fallback to client-side keyword extraction
      fallbackKeywordExtraction(transcript);
      setShowPlayButton(true); // Still show play button even with fallback
    }
  };

    // Auto-start listening when component mounts
    startListening();

    // Cleanup on component unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    setError("");
    setKeywords([]);
    setText("");
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        console.log("Starting speech recognition...");
      } catch (err) {
        console.error("Failed to start recognition:", err);
        setError("Failed to start recording. Please try again.");
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      console.log("Manually stopping speech recognition...");
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const fallbackKeywordExtraction = (transcript) => {
    const financialTerms = [
      "loan", "budget", "investment", "crypto", "tax", "credit", "interest", 
      "debt", "bank", "stock", "stocks", "bond", "dividend", "portfolio", 
      "asset", "liability", "equity", "inflation", "deflation", "recession", 
      "bull market", "bear market", "mutual fund", "etf", "hedge fund", 
      "derivative", "futures", "options", "forex", "liquidity", "yield", 
      "capital gain", "net worth", "cash flow", "amortization"
    ];
    
    const detected = financialTerms.filter(term => 
      transcript.toLowerCase().includes(term.toLowerCase())
    );
    
    setKeywords(detected.length > 0 ? detected : ["No financial terms detected"]);
    setError("Using fallback detection (backend unavailable)");
  };

  
  const goBack = () => {
    navigate(-1); // Go back to previous page
  };

  
    const handlePlayClick = () => {
    // Navigate to a new page with story options based on detected keywords
    navigate('/story-options', { 
      state: { 
        detectedKeywords: keywords,
        originalText: text
      } 
    });
  };

  return (
    <div className="speech-recognition-page">
      <button onClick={goBack} className="back-button">
        ← Back
      </button>

      <div className="speech-container">
        <h1 className="page-title">Speak Now</h1>
        <p className="page-subtitle">Say a financial term or phrase</p>

        {/* Animated microphone with circles */}
        <div className="mic-animation-container">
          <div className={`pulse-circle circle-1 ${isListening ? 'listening' : ''}`}></div>
          <div className={`pulse-circle circle-2 ${isListening ? 'listening' : ''}`}></div>
          <div className={`pulse-circle circle-3 ${isListening ? 'listening' : ''}`}></div>
          <div className="mic-icon">
            <div className="mic-body">
              <div className="mic-stand"></div>
              <div className="mic-head"></div>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="status-indicator">
          {isListening ? (
            <div className="listening-status">
              <span className="pulse-dot"></span>
              Listening...
            </div>
          ) : (
            <div className="ready-status">
              Ready
            </div>
          )}
        </div>

        {/* Control buttons */}
        <div className="control-buttons">
          {!isListening ? (
            <button onClick={startListening} className="start-button">
              Start Listening
            </button>
          ) : (
            <button onClick={stopListening} className="stop-button">
              Stop Listening
            </button>
          )}
        </div>

        {/* Results */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {text && (
          <div className="results-container">
            <div className="transcript-section">
              <h3>What you said:</h3>
              <p className="transcript">{text}</p>
            </div>
          </div>
        )}

        {keywords.length > 0 && (
          <div className="keywords-section">
            <h3>Financial Terms Detected:</h3>
            <div className="keywords-list">
              {keywords.map((keyword, index) => (
                <span key={index} className="keyword-tag">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
         {/* Let's Play! Button - Only show after keywords are detected */}
        {showPlayButton && (
          <div className="play-section">
            <button onClick={handlePlayClick} className="play-button">
              Let's Play!
            </button>
            <p className="play-subtitle">Continue to choose your story</p>
          </div>
        )}
      </div>
    </div>
  );
}

