import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Box } from '@mui/material';
import FormsIcon from '@mui/icons-material/ListAlt'; // Example icon, replace with appropriate one
import UsersIcon from '@mui/icons-material/People'; // Example icon, replace with appropriate one
import UserValidationIcon from '@mui/icons-material/VerifiedUser'; // Example icon, replace with appropriate one

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
    color: '#333',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
    }
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  };

  const iconStyle = {
    fontSize: '3rem',
    color: '#007bff',
    marginBottom: '10px'
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper style={paperStyle} elevation={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <FormsIcon style={iconStyle} />
            <Typography variant="h5" align="center">{viewForm}</Typography>
            <Typography variant="subtitle1" align="center">Forms List</Typography>
            <Link to="/admin/form_list" style={linkStyle}>More Information</Link>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper style={paperStyle} elevation={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <UserValidationIcon style={iconStyle} />
            <Typography variant="h5" align="center">{viewUserNonValideCount}</Typography>
            <Typography variant="subtitle1" align="center">Non-Validated Accounts</Typography>
            <Link to="/admin/user_list" style={linkStyle}>More Information</Link>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper style={paperStyle} elevation={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <UsersIcon style={iconStyle} />
            <Typography variant="h5" align="center">{viewUserCount}</Typography>
            <Typography variant="subtitle1" align="center">User Registrations</Typography>
            <Link to="/admin/user_list" style={linkStyle}>More Information</Link>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper style={paperStyle} elevation={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <UserValidationIcon style={iconStyle} />
            <Typography variant="h5" align="center">{viewUserNonValideCount}</Typography>
            <Typography variant="subtitle1" align="center">Non-Validated Accounts</Typography>
            <Link to="/admin/user_list" style={linkStyle}>More Information</Link>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

