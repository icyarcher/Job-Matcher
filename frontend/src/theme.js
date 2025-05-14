// frontend/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Poți personaliza paleta de culori, tipografia, etc. aici
  palette: {
    primary: {
      main: '#1976d2', // O nuanță de albastru
    },
    secondary: {
      main: '#dc004e', // O nuanță de roșu
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  // Poți adăuga alte personalizări pentru componente specifice
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Butoanele nu vor fi uppercase implicit
        },
      },
    },
  },
});

export default theme;