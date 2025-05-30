import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Job Matcher
          </Link>
        </Typography>
        <Box>
          {currentUser ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" component={Link} to="/profile">Profil</Button>
              <Typography variant="body2" component="span" sx={{ mx: 2 }}>
                Salut, {currentUser.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Deconectare</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Autentificare</Button>
              <Button color="inherit" component={Link} to="/register">Înregistrare</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;