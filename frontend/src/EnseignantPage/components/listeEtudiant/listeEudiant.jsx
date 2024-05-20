import UpdateIcon from '@mui/icons-material/Update';
import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import swal from 'sweetalert';

function ListeEtudiant() { 

    const [ViewEtudiant, setViewEtudiant] = useState([]);
    const navigate = useNavigate();
    const { formationId } = useParams();

    useEffect(() => {
        axios.get(`/api/inscription_student/${formationId}`).then(response => {
            if (response.data.status === 200) {
                setViewEtudiant(response.data.Inscription);
                swal("Success",response.data.message,"success");
                console.log(ViewEtudiant);
            }
        }).catch(error => {
            // Handle error
            console.error('Error fetching inscription:', error);
        });
    }, [formationId]); 
    
    
    const updateStatus = (studentId, newStatus) => {
        axios.put(`/api/update_student_status/${studentId}`, { status: newStatus }).then(response => {
            if (response.data.status === 200) {
                // Refresh the data after successful update
                axios.get(`/api/inscription_student/${formationId}`).then(response => {
                    if (response.data.status === 200) {
                        setViewEtudiant(response.data.Inscription);
                    }
                });
                swal("Success", response.data.message, "success");
            }
        }).catch(error => {
            // Handle error
            console.error('Error updating status:', error);
        });
    };
    const columns = [
        {
            field: "id",
            headerName: "#Id",
            flex: 1,
        },
        {
            field: "student.fisrtname",
            headerName: "Prénom",
            flex: 1,
            valueGetter: (params) => params.row.student.fisrtname,
        },
        {
            field: "student.lastname",
            headerName: "Nom",
            flex: 1,
            valueGetter: (params) => params.row.student.lastname,
        },
        {
            field: "student.email",
            headerName: "Email",
            flex: 1,
            valueGetter: (params) => params.row.student.email,
        },
        {
            field: "status",
            headerName: "Statut",
            flex: 1,
            renderCell: (params) => {
                const status = params.value;
                let textColor = '';

            if (status === '0') {
                textColor = 'red';
            } else if (status === '1') {
                textColor = 'green';
            }
    
                return (
                    <div style={{  backgroundColor: 'transparent', color: textColor, textAlign: 'center', padding: '8px', borderRadius: '4px' }}>
                    {status === '0' ? 'Non accepté' : 'Accepté'}
                    </div>
                );
            }
        },
        {
            field: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                const handleClick = () => {
                    updateStatus(params.row.id, '1'); // Assuming '1' is the new status for accepted
                };
                return (
                    <Box
                        display="flex"
                        justifyContent="center"
                        borderRadius="4px"
                    >
                        <Button type="submit" color="secondary" onClick={handleClick} >
                            <UpdateIcon />
                        </Button>
                    </Box>
                );
            }
        }
    ];

    return (
        <>
            <Box m="20px">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    m="20px "
                >
                    <Box width="100%" alignItems="center">
                        <Box m="20px">
                            <Box
                                m="40px 0 0 0"
                                height="75vh"
                            >
                                <DataGrid checkboxSelection rows={ViewEtudiant} columns={columns} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ListeEtudiant;
