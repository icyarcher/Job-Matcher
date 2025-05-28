import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
// import Sidebar from './components/Layout/Sidebar'; // Nu o folosim în layout-ul simplu din App.js
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/Auth/UserProfile';
import PersonalInfoForm from './components/Forms/PersonalInfoForm';
import JobPreferencesForm from './components/Forms/JobPreferencesForm';
import CVUpload from './components/Forms/CVUpload';
import { useAuth } from './contexts/AuthContext';

// Componentă Helper pentru Rute Protejate
function ProtectedRoute() {
  const { currentUser, loading } = useAuth();

  // Așteaptă până când starea de autentificare este verificată
  if (loading) {
      return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}><p>Se încarcă...</p></Box>; // Sau un spinner MUI
  }

  // Dacă utilizatorul este autentificat, afișează componenta rutei
  // Altfel, redirecționează către pagina de login
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      {/* Box cu stiluri pentru a împinge footer-ul în jos */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header /> {/* Antetul este vizibil pe toate paginile */}

        {/* Conținutul principal al paginilor */}
        <Box component="main" sx={{ flexGrow: 1, py: 3 }}> {/* flexGrow 1 face ca acest box să ocupe spațiul disponibil */}
          <Routes>
            {/* Rute publice */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rute protejate (necesită autentificare) */}
            {/* Folosim componenta ProtectedRoute ca părinte pentru rutele protejate */}
            <Route element={<ProtectedRoute />}>
              {/* Rutele cuprinse aici vor fi accesibile doar utilizatorilor autentificați */}
              <Route path="/" element={<Dashboard />} /> {/* Pagina principală după login */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              {/* Rute pentru formulare - poți crea o pagină dedicată formularelor sau le poți accesa direct */}
               <Route path="/forms/personal" element={<PersonalInfoForm />} />
               <Route path="/forms/cv" element={<CVUpload />} />
               <Route path="/forms/preferences" element={<JobPreferencesForm />} />

              {/* Adaugă alte rute protejate aici */}
            </Route>

             {/* Rute fallback sau 404 - opțional */}
             {/* <Route path="*" element={currentUser ? <Dashboard /> : <Navigate to="/login" replace />} /> */} {/* Redirecționează userii neautentificați la login chiar dacă scriu o rută greșită */}


          </Routes>
        </Box>

        <Footer /> {/* Subsolul este vizibil pe toate paginile */}
      </Box>
    </Router>
  );
}

export default App;