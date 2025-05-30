import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/Auth/UserProfile';
import PersonalInfoForm from './components/Forms/PersonalInfoForm';
import JobPreferencesForm from './components/Forms/JobPreferencesForm';
import CVUpload from './components/Forms/CVUpload';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) {
      return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}><p>Se încarcă...</p></Box>; // Sau un spinner MUI
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />
               <Route path="/forms/personal" element={<PersonalInfoForm />} />
               <Route path="/forms/cv" element={<CVUpload />} />
               <Route path="/forms/preferences" element={<JobPreferencesForm />} />

            </Route>
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;