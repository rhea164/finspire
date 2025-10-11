import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Avatar from './components/Avatar';
import { Navigate } from 'react-router-dom';
import SpeechRecognitionPage from './components/SpeechRecognitionPage';
import BuzzTesla from './components/BuzzTesla';
import StoryOptions from './components/StoryOptions'; 
import Journey from './components/journey';
import story1 from './components/story1';
import story4 from './components/story4';

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
          <Route path="/story-options" element={<StoryOptions />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/story1" element={<story1 />} />
          <Route path="/story4" element={<story4 />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;