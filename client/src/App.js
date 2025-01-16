import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import JobBoardPage from './pages/JobBoardPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import { UserProvider } from './config/UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/job-board" element={<JobBoardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegistrationPage />} /> {/* Registration page */}
            <Route path="/login" element={<LoginPage />} /> {/* Login page */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
