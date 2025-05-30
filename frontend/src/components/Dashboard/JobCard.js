import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const JobCard = ({ job }) => {
  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div" color="primary" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {job.company} — {job.location}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
          Sursă: {job.source}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Aplică
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
