import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';

function Dashboard() {
  const [viewUserCount, setViewUserCount] = useState("");
  const [viewUserNonValideCount, setViewUserNonValideCount] = useState("");
  const [viewForm, setViewForm] = useState("");

  useEffect(() => {
    // Simulated data for demonstration
    setViewUserCount(50);
    setViewUserNonValideCount(20);
    setViewForm(10);
  }, []);

  const paperStyle = {
    padding: '20px',
    textAlign: 'center',
    color: 'black',
    background: '#fff',
    borderRadius: '4px',
    boxShadow: '0 1px 1px rgba(0,0,0,.05)',
    transition: 'all .3s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 2px 2px rgba(0,0,0,.1)'
    }
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper style={paperStyle} elevation={3}>
          <Typography variant="h5" align="center">{viewForm}</Typography>
          <Typography variant="subtitle1" align="center">Liste de Forms</Typography>
          <Link to="/admin/form_list" style={linkStyle}>Plus d'informations</Link>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper style={paperStyle} elevation={3}>
          <Typography variant="h5" align="center">{viewUserNonValideCount}</Typography>
          <Typography variant="subtitle1" align="center">Les compts Non valide</Typography>
          <Link to="/admin/user_list" style={linkStyle}>Plus d'informations</Link>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper style={paperStyle} elevation={3}>
          <Typography variant="h5" align="center">{viewUserCount}</Typography>
          <Typography variant="subtitle1" align="center">Inscriptions des utilisateurs</Typography>
          <Link to="/admin/user_list" style={linkStyle}>Plus d'informations</Link>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper style={paperStyle} elevation={3}>
          <Typography variant="h5" align="center">{viewUserNonValideCount}</Typography>
          <Typography variant="subtitle1" align="center">Les compts Non valide</Typography>
          <Link to="/admin/user_list" style={linkStyle}>Plus d'informations</Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
