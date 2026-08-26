import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PatientProfile from './pages/PatientProfile';
import MemoryLibrary from './pages/MemoryLibrary';
import Activities from './pages/Activities';
import MemoryJourney from './pages/MemoryJourney';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import { initializeDemoData } from './utils/storage';
import './App.css';

function App() {
  const [isLanding, setIsLanding] = useState(true);

  useEffect(() => {
    // Initialize demo data on first load
    initializeDemoData();
  }, []);

  if (isLanding) {
    return <LandingPage onEnterDemo={() => setIsLanding(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="memory-library" element={<MemoryLibrary />} />
          <Route path="activities" element={<Activities />} />
          <Route path="journey" element={<MemoryJourney />} />
          <Route path="insights" element={<Insights />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
