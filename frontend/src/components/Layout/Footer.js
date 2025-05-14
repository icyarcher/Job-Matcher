// frontend/src/components/Layout/Footer.js
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main', // Folosește culoarea primară din temă
        color: 'white',
        p: 3,
        mt: 'auto', // Împinge subsolul în jos dacă conținutul este scurt
        textAlign: 'center',
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="inherit">
          © {new Date().getFullYear()} Job Matcher. Toate drepturile rezervate.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;