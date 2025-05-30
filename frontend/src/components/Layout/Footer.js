import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        p: 3,
        mt: 'auto',
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