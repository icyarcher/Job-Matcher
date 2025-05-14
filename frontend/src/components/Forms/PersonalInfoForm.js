// frontend/src/components/Forms/PersonalInfoForm.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';

function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    // Adaugă alte câmpuri necesare
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Personal Info Submitted:', formData);
    // Aici ai trimite datele către backend/Firestore etc.
    alert('Informațiile personale au fost (simulat) salvate!');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
                Informații Personale
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Prenume"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                         <TextField
                            fullWidth
                            label="Nume"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                     <Grid item xs={12}>
                         <TextField
                            fullWidth
                            label="Număr de telefon"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                        />
                    </Grid>
                     <Grid item xs={12}>
                         <TextField
                            fullWidth
                            label="Adresă"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            multiline
                            rows={2}
                        />
                    </Grid>
                    {/* Adaugă mai multe câmpuri aici */}
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                >
                    Salvează Informații
                </Button>
            </Box>
        </Paper>
    </Container>
  );
}

export default PersonalInfoForm;