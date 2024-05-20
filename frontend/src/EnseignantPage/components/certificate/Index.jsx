import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { GiTeacher } from 'react-icons/gi';
import axios from "axios";

function Index() {
  const [viewFormation, setViewFormation] = useState([]);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('auth_USER'));
    axios.get(`/api/Enseignant_formations/${authUser.id}`).then(response => {
      // Handle the response data
      if (response.data.status === 200) {
        setViewFormation(response.data.formations);
        console.log(viewFormation);
      }
    });
  }, []);

  return (
    <Box className='public-cours' style={{ marginTop: '20px' }}>
      <Box className='container'>
        <Box className='content grid3'>
        {viewFormation.map((formation, index) => (

          <Box className='box'>
            <Box className='img'>
              <GiTeacher style={{ fontSize: '4rem' }} />
            </Box>
            {/* Rendering viewFormation data if it's an array */}
              <React.Fragment key={index}>
                <h1>{formation.title}</h1>
                <Link to={`/enseignant/certife_listeEtudiant/${formation.id}/${formation.title}`} className='voir-Btn' type="submit" color="secondary" variant="contained">
                  <h6>voir eleves</h6>
                </Link>
              </React.Fragment>
          </Box>
              ))}

        </Box>

      </Box>
      
    </Box>
  );
}

export default Index;
