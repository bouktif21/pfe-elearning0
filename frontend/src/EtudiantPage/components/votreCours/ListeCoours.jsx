import React, { useEffect, useState } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import axios from "axios";
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { PictureAsPdf as PdfIcon, Visibility as ViewIcon , Description as QcmIcon} from '@mui/icons-material';
function ListeCoours() {
    const { id } = useParams();
    const [viewCours, setViewCours] = useState([]);
    const [viewQcm, setviewQcm] = useState([]);
    const [viewReunion , setViewReunion] = useState([])

    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`/api/Etudiant_Cours/${id}`).then(response => {
            if (response.data.status === 200) {
                setViewCours(response.data.Cour);
            }
        }).catch(error => {
            // Handle error
            console.error('Error fetching inscription:', error);
        });

        axios.get(`/api/Etudiant_qcm/${id}`).then(response => {
            if (response.data.status === 200) {
                setviewQcm(response.data.qcm);
            }
        }).catch(error => {
            // Handle error
            console.error('Error fetching inscription:', error);
        });


        axios.get(`/api/etudiantCoursEnLigne/${id}`).then(response => {
            if (response.data.status === 200) {
                setViewReunion(response.data.Reuions)
                console.log(viewReunion)
            }
        }).catch(error => {
            // Handle error
            console.error('Error fetching inscription:', error);
        });
    }, [id]);
    const handleClick = (qcmId) => {
        // Redirect to the desired page when clicking the ViewIcon
        navigate(`/eleve/test_qcm/${qcmId}`);
      };
    

    return (
        <div>
            <List>
                <h6 style={{ marginLeft: "16px", color: "#1eb2a6" }}>Liste des Cours</h6>
                {viewCours.map((course, index) => (
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
                ))}
            </List>
            <List>
                <h6 style={{ marginLeft: "16px", color: "#1eb2a6" }}>Qcm</h6>
                {viewQcm.map((qcm, index) => (
                    <ListItem key={index} style={{ backgroundColor: "#f0f0f0", borderRadius: "5px", margin: "5px 0" }}>
                        <ListItemIcon>
                        <QcmIcon style={{ color: "#1eb2a6" }} /> {/* Replaced PdfIcon with QcmIcon */}
                        </ListItemIcon>
                        <ListItemText primary={qcm.title} />
                        <ListItemIcon onClick={() => handleClick(qcm.id)}>
                            <ViewIcon style={{ color: "#1eb2a6" }} />
                            </ListItemIcon>
                    </ListItem>
                ))}
            </List>
            <List>
                <h6 style={{ marginLeft: "16px", color: "#1eb2a6" }}>Liste des Reunion</h6>
                {viewReunion.map((Reunion, index) => (
                    <ListItem key={index} style={{ backgroundColor: "#f0f0f0", borderRadius: "5px", margin: "5px 0" }}>
                        <ListItemIcon>
                            <PdfIcon style={{ color: "#1eb2a6" }} />
                        </ListItemIcon>
                        <ListItemText primary={Reunion.url} />
                        <ListItemText primary={Reunion.date} style={{ color: "#1eb2a6" }}  />
                        <ListItemIcon>
                            <a href={Reunion.url} target="_blank" rel="noopener noreferrer">
                                <ViewIcon style={{ color: "#1eb2a6" }} />
                            </a>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default ListeCoours;
