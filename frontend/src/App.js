import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Avatar from './components/Avatar';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    //  <div className="App">
    //   <Landing />
    // </div>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/avatar" element={<Avatar />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;