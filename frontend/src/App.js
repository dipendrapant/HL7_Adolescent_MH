import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssessmentPage from './AssessmentPage';
import ResultsPage from './ResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/" element={<AssessmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
