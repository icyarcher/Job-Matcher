// frontend/src/components/Forms/CVUpload.js
import React, { useState } from 'react';
import { Container, Button, Typography, Box, Paper, Input } from '@mui/material';

function CVUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Selectează un fișier mai întâi!');
      return;
    }

    setUploading(true);
    console.log('Uploading file:', selectedFile.name);

    // Aici ai implementa logica reală de upload (ex: către Firebase Storage, un backend API)
    // Aceasta este doar o simulare:
    setTimeout(() => {
        setUploading(false);
        alert(`Fișierul "${selectedFile.name}" a fost (simulat) încărcat!`);
        setSelectedFile(null); // Resetează selecția
    }, 2000); // Simulează timpul de încărcare
  };

  return (
     <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
                Încărcare CV
            </Typography>
            <Typography variant="body1" gutterBottom>
                Încarcă CV-ul tău în format PDF sau DOC/DOCX.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    sx={{ display: 'none' }}
                    id="cv-upload-button"
                />
                <label htmlFor="cv-upload-button">
                    <Button variant="outlined" component="span">
                        Selectează Fișier
                    </Button>
                </label>
                {selectedFile && <Typography>{selectedFile.name}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                >
                    {uploading ? 'Se încarcă...' : 'Încarcă CV'}
                </Button>
            </Box>
            {uploading && <Typography sx={{mt: 2}}>Încărcare în progres...</Typography>}
        </Paper>
    </Container>
  );
}

export default CVUpload;