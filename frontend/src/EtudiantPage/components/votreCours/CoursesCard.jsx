import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../ListeDeFormation/courses.css";
import { Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { GiTeacher } from 'react-icons/gi';

const CoursesCard = () => {
  const [viewFormation, setViewFormation] = useState([]);
  const [student_id, setStudentId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/Etudiant_get_inscription_formation/${student_id}`);
        if (response.data.status === 200) {
          setViewFormation(response.data.formations);
        }
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };

    if (student_id !== '') {
      fetchData();
    }
  }, [student_id]);

  useEffect(() => {
    const storedData = localStorage.getItem('auth_USER');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStudentId(parsedData.id);  
    }
  }, []);

  return (
    <>
      <Box className='public-cours' style={{ marginTop: '20px' }}>
        <Box className='container'>
          <Box className='content grid3'>
            {viewFormation.map((formation, index) => (
              <Box className='box' key={index}>
                 <Box className='img'>
                 <h1>{formation.formation.title}</h1>  
             </Box>
                <Box className='img'>
                  <GiTeacher style={{ fontSize: '4rem' }} />
                </Box>
                {/* Rendering viewFormation data if it's an array */}
                <React.Fragment>
                  <h1>{formation.title}</h1>
                  <Link to={`/eleve/listeCours/${formation.formation.id}`} className='voir-Btn' type="submit" color="secondary" variant="contained">
                    <h6>Commencer</h6>
                  </Link>
                </React.Fragment>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CoursesCard;
