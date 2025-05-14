// frontend/src/components/Dashboard/JobList.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import JobCard from './JobCard';
import { getJobs } from '../../services/jobService'; // Importă serviciul

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError('Failed to fetch jobs.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []); // Rulează o singură dată la montarea componentei

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ml: 2}}>Se încarcă joburile...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  }

  if (jobs.length === 0) {
      return <Typography sx={{ mt: 4 }}>Nu s-au găsit joburi disponibile.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </Box>
  );
}

export default JobList;