// frontend/src/components/Layout/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';

// Exemplu simplu de Sidebar (necesită integrare în layout-ul general al App.js)
function Sidebar({ open, onClose }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
        <Typography variant="h6" sx={{ p: 2 }}>Meniu</Typography>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Profil Utilizator" />
          </ListItem>
          <ListItem button component={Link} to="/forms/personal">
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
            <ListItemText primary="Formulare Profil" />
          </ListItem>
          {/* Adaugă alte linkuri aici */}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;

// Notă: Integrarea Sidebar-ului într-un layout complex (cu Header și conținut principal)
// ar implica gestionarea stării `open` în App.js sau un component de Layout principal
// și ajustarea padding-ului/marginii conținutului pentru a nu fi acoperit de Drawer.
// Pentru simplitate, în App.js vom folosi doar Header și Footer.