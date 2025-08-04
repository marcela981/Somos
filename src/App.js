import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/Theme/ThemeProvider';
import OnboardingForm from './components/Onboarding/OnboardingForm';
import Dashboard from './components/Dashboard/Dashboard';
import PlanPage from './components/Pages/PlanPage';
import ProgressPage from './components/Pages/ProgressPage';
import SportsPage from './components/Pages/SportsPage';
import NutritionPage from './components/Pages/NutritionPage';
import MotivationPage from './components/Pages/MotivationPage';
import './components/Theme/Theme.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<OnboardingForm />} />
            <Route path="/dashboard/:userID" element={<Dashboard />} />
            <Route path="/plan/:userID" element={<PlanPage />} />
            <Route path="/progress/:userID" element={<ProgressPage />} />
            <Route path="/sports/:userID" element={<SportsPage />} />
            <Route path="/nutrition/:userID" element={<NutritionPage />} />
            <Route path="/motivation/:userID" element={<MotivationPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
