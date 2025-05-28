import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  TextField
} from '@mui/material';
import JobList from "./JobList";
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [keyword, setKeyword] = useState("python");
  const [location, setLocation] = useState("Brasov");

  const handleScrape = async () => {
    if (!keyword || !location) return;

    setLoading(true);

    try {
      // 1. Apelează scrapingul
      const scrapeRes = await fetch(`http://localhost:8000/api/scrape?keyword=${keyword}&location=${location}`);
      const scrapeData = await scrapeRes.json();
      console.log("Joburi extrase:", scrapeData);

      // 2. Așteaptă puțin (dacă Firebase salvează asincron)
      await new Promise((res) => setTimeout(res, 2000));

      // 3. Forțează reîncărcarea JobList
      setReloadKey(prev => prev + 1);
    } catch (error) {
      console.error("Eroare la declanșarea scrapingului:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {currentUser && (
        <Typography variant="h6" gutterBottom>
          Bine ai venit, {currentUser.email}!
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2, mt: 4, mb: 2 }}>
        <TextField
          label="Cuvânt cheie"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          size="small"
        />
        <TextField
          label="Locație"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={handleScrape} disabled={loading}>
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Se extrag...
            </>
          ) : (
            "Caută joburi"
          )}
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Joburi Salvate</Typography>
      <JobList key={reloadKey} />
    </Container>
  );
}

export default Dashboard;
