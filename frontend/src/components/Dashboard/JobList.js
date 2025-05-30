import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Box, Grid } from "@mui/material";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la fetch:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (jobs.length === 0) {
    return <Typography>Nu există joburi salvate momentan.</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {jobs.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  );
}

export default JobList;
