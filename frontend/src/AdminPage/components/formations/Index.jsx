import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import swal from 'sweetalert';

function Index() {
    const [viewFormation, setViewFormation] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get('/api/Liste_formations');
                if (response.data.status === 200) {
                    setViewFormation(response.data.formations);
                }
            } catch (error) {
                console.error('Error fetching formations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFormations();
    }, []);

    const deleteFormation = async (e, id) => {
        e.preventDefault();
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this formation!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if (willDelete) {
            try {
                const response = await axios.delete(`/api/delete_formation/${id}`);
                if (response.data.status === 200) {
                    swal("Success", response.data.message, 'success');
                    setViewFormation(prevFormations => prevFormations.filter(formation => formation.id !== id));
                }
            } catch (error) {
                console.error('Error deleting formation:', error);
            }
        } else {
            swal("Your formation is safe!");
        }
    };

    const columns = [
        {
            field: "title",
            headerName: "Nom de Formation",
            flex: 1,
        },
        {
            field: "idEnseignant",
            headerName: "Enseignant Id",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
        },
        {
            field: "length",
            headerName: "Durée de Formation",
            flex: 1,
        },
        
        {
            field: "price",
            headerName: "Prix",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                const handleUpdateClick = () => navigate(`/admin/update_formation/${params.row.id}`);
                return (
                    <Box display="flex" justifyContent="center" borderRadius="4px">
                        <Button type="button" onClick={(e) => deleteFormation(e, params.row.id)} color="secondary">
                            <DeleteIcon className="deleteIcon" />
                        </Button>
                        <Button type="button" color="secondary" onClick={handleUpdateClick}>
                            <UpdateIcon />
                        </Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" m="20px">
                <Box width="100%" alignItems="center">
                    <Box m="20px">
                        <Box m="40px 0 0 0" height="75vh">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <DataGrid checkboxSelection rows={viewFormation} columns={columns} />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Index;
