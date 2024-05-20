import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import swal from 'sweetalert';

const Qcm = () => {      
  const [viewQcm, setViewQcm] = useState([]);
  const [enseignantId, setenseignantId] = useState("");

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('auth_USER'));
    const enseignantId = authUser.id;
     setenseignantId(enseignantId)
    axios.get(`/api/getQuiszz/${enseignantId}`).then(response => {
      if (response.data.status === 200) {
        setViewQcm(response.data.quizzes);
      }
    });
  }, []);

  const deleteQcm = (e, id) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this formation!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/api/delete_quizzes/${id}`).then(response => {
          if (response.data.status === 200) {
            swal("Success", response.data.message , 'success');
            axios.get(`/api/getQuiszz/${enseignantId}`).then(response => {
              if (response.data.status === 200) {
                setViewQcm(response.data.quizzes);
              }
            });      
          }
        })
      } else {
        swal("Your module is safe!");
      }
    });
  }

  const columns = [
    {
      field: "id",
      headerName: "#Id",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Nom de Qcm",
      flex: 1,
    },
    {
      field: "formation.title",
      headerName: "Formation",
      flex: 1,
      valueGetter: (params) => params.row.formation.title,
    },
    {
      field: "",
      headerName: "Voir Question",
      renderCell: (params) => {
        const handleClick = () => navigate(`/enseignant/view_Qestion/${params.row.id}`);
        return (
          <Box display="flex" justifyContent="center" borderRadius="4px">     
            <Button type="submit" color="secondary" onClick={handleClick}>
              <VisibilityIcon /> 
            </Button>     
          </Box>
        );
      }
    },
    {
      field: "action",
      headerName: "Ajoute Qestion",
      flex: 1,
      renderCell: (params) => {
        const handleClick = () => navigate(`/enseignant/Add_Qestion/${params.row.id}`);
        return (
          <Box display="flex" justifyContent="center" borderRadius="4px">     
            <Button type="submit" color="secondary" onClick={handleClick}>
              <AddIcon /> 
            </Button>     
          </Box>
        );
      }
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,

      renderCell: (params) => {
        const handleClick = () => navigate(`/enseignant/update_Qcm/${params.row.id}`);
        return (
          <Box display="flex" justifyContent="center" borderRadius="4px">     
            <Button type="submit" onClick={(e) => deleteQcm(e, params.row.id)} color="secondary">
              <DeleteIcon className="deleteIcon" /> 
            </Button>
            <Button type="submit" color="secondary" onClick={handleClick}>
              <UpdateIcon /> 
            </Button>   
              
          </Box>
        );
      }
    }
  ];

  const navigate = useNavigate();

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" m="20px ">
        <Box width="100%" alignItems="center">
          <Box m="20px">
            <Box m="40px 0 0 0" height="75vh">
              <DataGrid checkboxSelection rows={viewQcm} columns={columns} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Qcm;
