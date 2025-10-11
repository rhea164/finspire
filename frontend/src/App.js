import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Avatar from './components/Avatar';
import { Navigate } from 'react-router-dom';
import SpeechRecognitionPage from './components/SpeechRecognitionPage';
import BuzzTesla from './components/BuzzTesla';
import StoryOptions from './components/StoryOptions'; 
import Journey from './components/Journey';
import Story1 from './components/Story1';
import Story4 from './components/Story4';
import Story2 from './components/Story2';
import Story3 from './components/Story3';
import Story6 from './components/Story6';
import { ScoreProvider } from './context/StoreContext';
import Summary from './components/Summary';




function App() {
  return (
    //  <div>
    //   <BuzzTesla />
    // </div>
    <ScoreProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/speech" element={<SpeechRecognitionPage />} />
          <Route path="/story-options" element={<StoryOptions />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/story1" element={<Story1 />} />
          <Route path="/story4" element={<Story4 />} />
          <Route path="/story2" element={<Story2 />} />
          <Route path="/story3" element={<Story3 />} />
          <Route path="/story6" element={<Story6 />} />
          <Route path="/summary" element={<Summary />} />

        </Routes>
      </div>
    </Router>
    </ScoreProvider>
  );
}

export default App;