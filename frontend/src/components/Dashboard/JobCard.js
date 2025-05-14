// frontend/src/components/Dashboard/JobCard.js
import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function JobCard({ job }) {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {job.company} - {job.location}
        </Typography>
        <Typography variant="body2">
          {job.description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Adaugă butoane pentru "Aplică", "Salvează", "Detalii" etc. */}
        <Button size="small">Vezi Detalii</Button>
        <Button size="small">Aplică Acum</Button>
      </CardActions>
    </Card>
  );
}

export default JobCard;