import React, { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import axios from "axios";
import { List, ListItem, ListItemIcon, ListItemText,Typography } from '@mui/material';
import { PictureAsPdf as PdfIcon, Visibility as ViewIcon } from '@mui/icons-material';

function ListeCours() {

    const [viewCours, setViewCours] = useState([]);
    const [viewQcm, setviewQcm] = useState([]);
    const [viewReunion , setViewReunion] = useState([])
    const [formationOptions, setFormationOptions] = useState([]);
    const [FormationId, setFormationId] = useState("");
    const [enseignant_id, setenseignant_id] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
      const authUser = JSON.parse(localStorage.getItem('auth_USER'));
      setenseignant_id(authUser.id);
  
      // Fetch formation options when enseignant_id changes
      if (authUser.id) {
        axios.get(`/api/Enseignant_formations/${authUser.id}`).then(response => {
          // Handle the response data
          if (response.data.status === 200) {
            setFormationOptions(response.data.formations);
          }
        });
      }
    }, [enseignant_id]);

    useEffect(() => {
      if (FormationId){
        axios.get(`/api/Ensegniant_Cours/${FormationId}`).then(response => {
          if (response.data.status === 200) {
              setViewCours(response.data.Cour);
          }
      }).catch(error => {
          // Handle error
          console.error('Error fetching inscription:', error);
      });

      axios.get(`/api/Ensegniant_qcm/${FormationId}`).then(response => {
          if (response.data.status === 200) {
              setviewQcm(response.data.qcm);
          }
      }).catch(error => {
          // Handle error
          console.error('Error fetching inscription:', error);
      });


      axios.get(`/api/EnsegniantCoursEnLigne/${FormationId}`).then(response => {
          if (response.data.status === 200) {
              setViewReunion(response.data.Reuions)
              console.log(viewReunion)
          }
      }).catch(error => {
          // Handle error
          console.error('Error fetching inscription:', error);
      });
      }
   
    }, [FormationId]);
    const handleClick = (qcmId) => {
        // Redirect to the desired page when clicking the ViewIcon
        navigate(`/eleve/test_qcm/${qcmId}`);
      };
    

    return (
        <div>
           <div className="input-group mb-3 mt-2" >
              <label className="input-group-text">Formation</label>
              <select
                value={FormationId}
                onChange={(e) => setFormationId(e.target.value)}
                className="formSelect"
              >
                <option>Choose...</option>
                {formationOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.title}</option>
                ))}
              </select>
            </div>
              <List>

                <h6 style={{ marginLeft: "16px", color: "#1eb2a6" }}>Liste des Cours</h6>

                {viewCours.length === 0 ? (
                    <Typography variant="body1" style={{ fontSize:"14px", color: "red", marginLeft: "16px" }}>
                        Vous n'avez pas des coures pour cette formation
                    </Typography>
                ) : (
                    viewCours.map((course, index) => (
                        <ListItem key={index} style={{ backgroundColor: "#f0f0f0", borderRadius: "5px", margin: "5px 0" }}>
                            <ListItemIcon>
                                <PdfIcon style={{ color: "#1eb2a6" }} />
                            </ListItemIcon>
                            <ListItemText primary={course.cour} />
                            <ListItemIcon>
                                <a href={`http://localhost:8000/uploads/Cours/${course.file}`} target="_blank" rel="noopener noreferrer">
                                    <ViewIcon style={{ color: "#1eb2a6" }} />
                                </a>
                            </ListItemIcon>
                        </ListItem>
                    ))
                )}
            </List>

        </div>
    );
}

export default ListeCours;
