// src/App.js
import React from "react";
import "./App.css";

// Import your components correctly
import Home from "./components/Home";
import Summary from "./components/summary";

function App() {
  // For now, just render one page at a time
  return (
    <div className="App">
      {/* Render Home or Summary */}
      <Summary />
    </div>
  );
}

export default App;
