import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link
} from "@mui/material";

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

  // Grupare după sursă
  const grouped = jobs.reduce((acc, job) => {
    const key = job.source || "Necunoscut";
    acc[key] = acc[key] || [];
    acc[key].push(job);
    return acc;
  }, {});

  return (
    <Box>
      {Object.entries(grouped).map(([source, group]) => (
        <Box key={source} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            📌 {source}
          </Typography>
          <List>
            {group.map((job, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={
                    <Link href={job.link} target="_blank" rel="noopener noreferrer" underline="hover">
                      {job.title}
                    </Link>
                  }
                  secondary={`${job.company} • ${job.location}`}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
}

export default JobList;

