import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Avatar from './components/Avatar';
import { Navigate } from 'react-router-dom';
import SpeechRecognitionPage from './components/SpeechRecognitionPage';
import BuzzTesla from './components/BuzzTesla';

function App() {
  return (
    //  <div>
    //   <BuzzTesla />
    // </div>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/speech" element={<SpeechRecognitionPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;