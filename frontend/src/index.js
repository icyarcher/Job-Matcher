import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);