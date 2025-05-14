// frontend/src/components/Dashboard/Dashboard.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import JobList from './JobList';
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {
    const { currentUser } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {currentUser && (
          <Typography variant="h6" gutterBottom>
            Bine ai venit, {currentUser.email}!
          </Typography>
      )}

      <Typography variant="h5" sx={{mt: 4, mb: 2}}>Joburi Recomandate</Typography>
      <JobList /> {/* Afișează lista de joburi */}

      {/* Poți adăuga alte secțiuni aici, de ex. "Joburi Aplicare", "Joburi Salvate" etc. */}
    </Container>
  );
}

export default Dashboard;