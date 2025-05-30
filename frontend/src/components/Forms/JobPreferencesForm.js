import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

function JobPreferencesForm() {
  const [formData, setFormData] = useState({
    preferredTitle: '',
    preferredLocation: '',
    contractType: '',
    remotePreference: false,
    industries: [],
  });

   const contractTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
   const availableIndustries = ['IT', 'Marketing', 'Finance', 'Healthcare', 'Education', 'Retail'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleIndustryChange = (event) => {
    const { value } = event.target;
     setFormData(prevState => ({
      ...prevState,
      industries: typeof value === 'string' ? value.split(',') : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Preferences Submitted:', formData);
    alert('Preferințele de job au fost (simulat) salvate!');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
                Preferințe Job
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Titlu preferat"
                            name="preferredTitle"
                            value={formData.preferredTitle}
                            onChange={handleChange}
                        />
                    </Grid>
                     <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Locație preferată"
                            name="preferredLocation"
                            value={formData.preferredLocation}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="contract-type-label">Tip Contract</InputLabel>
                            <Select
                                labelId="contract-type-label"
                                id="contractType"
                                name="contractType"
                                value={formData.contractType}
                                label="Tip Contract"
                                onChange={handleChange}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {contractTypes.map(type => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                         <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.remotePreference}
                                    onChange={handleChange}
                                    name="remotePreference"
                                />
                            }
                            label="Prefer joburi remote"
                        />
                    </Grid>
                     <Grid item xs={12}>
                         <FormControl fullWidth>
                             <InputLabel id="industries-label">Industrii preferate</InputLabel>
                             <Select
                                labelId="industries-label"
                                id="industries"
                                multiple
                                name="industries"
                                value={formData.industries}
                                onChange={handleIndustryChange}
                                label="Industrii preferate"
                             >
                                 {availableIndustries.map((industry) => (
                                     <MenuItem key={industry} value={industry}>
                                         {industry}
                                     </MenuItem>
                                 ))}
                             </Select>
                         </FormControl>
                     </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                >
                    Salvează Preferințe
                </Button>
            </Box>
        </Paper>
    </Container>
  );
}

export default JobPreferencesForm;