// frontend/src/components/Auth/UserProfile.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function UserProfile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Această pagină ar trebui să fie protejată, dar facem o verificare de siguranță
    return <Typography>Nu ești autentificat.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profil Utilizator
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Informații Cont:</Typography>
        <Typography variant="body1">Email: {currentUser.email}</Typography>
        {/* Poți adăuga alte informații despre utilizator dacă sunt stocate în Firebase sau Firestore */}
        {/* <Typography variant="body1">Nume: {currentUser.displayName}</Typography> */}
      </Box>

      <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Informații Profil și Preferințe:</Typography>
          <Typography variant="body1">
            Completează sau editează informațiile tale personale, CV-ul și preferințele de job pentru a primi recomandări mai bune.
          </Typography>
          <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/forms/personal"
              sx={{ mt: 2 }}
          >
              Editează Profil / Formulare
          </Button>
      </Box>

      {/* Poți adăuga secțiuni pentru joburi salvate, aplicări etc. */}
      {/* <Box>
          <Typography variant="h6">Joburi Salvate:</Typography>
          // Lista joburi salvate
      </Box> */}

    </Container>
  );
}

export default UserProfile;