import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseReader from './pages/CourseReader';
import RecruiterPortal from './pages/RecruiterPortal';
import UserProfile from './pages/UserProfile'; 
const App = () => {
  return (
    <Router>
      <div style={{ margin: 0, padding: 0, backgroundColor: '#121212', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<CourseReader />} />
          <Route path="/recruit" element={<RecruiterPortal />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;