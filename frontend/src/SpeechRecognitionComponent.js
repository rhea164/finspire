// SpeechRecognitionComponent.js
import React, { useState, useEffect, useRef } from "react";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function SpeechRecognitionComponent() {
  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  
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
      fetch("http://localhost:5000/api/extract", {
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

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">🎙️ FinShazam</h2>
      <p className="mb-4">Click below and say a financial term</p>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={startListening}
          disabled={isListening}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:bg-blue-300 transition-colors"
        >
          {isListening ? "Listening..." : "Start Recording"}
        </button>

        {isListening && (
          <button
            onClick={stopListening}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            Stop Recording
          </button>
        )}
      </div>

      {error && (
        <p className="mt-4 text-red-600 font-medium">Error: {error}</p>
      )}

      {text && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold text-gray-700">Transcript:</p>
          <p className="mt-2 italic text-gray-600">{text}</p>
        </div>
      )}

      {keywords.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="font-semibold text-green-700">Detected Financial Terms:</p>
          <p className="mt-2 font-medium text-green-600">
            {keywords.join(", ")}
          </p>
        </div>
      )}

      {isListening && (
        <div className="mt-4">
          <div className="animate-pulse flex justify-center items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mx-1 animate-bounce"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-4 h-4 bg-red-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Speak now...</p>
        </div>
      )}
    </div>
  );
}