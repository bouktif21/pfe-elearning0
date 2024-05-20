import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';

import swal from 'sweetalert';

const Formation = () => {      
  const [ViewFormation , setViewFormation] = useState([])
  
  useEffect(()=>{
    const authUser = JSON.parse(localStorage.getItem('auth_USER'));
    axios.get(`/api/Enseignant_formations/${authUser.id}`).then(response => {
        // Handle the response data
        if(response.data.status === 200){
          setViewFormation(response.data.formations)
          console.log(ViewFormation)

        }
    })
 
  },[]);

  const navigate = useNavigate(); // Déplacer l'appel à useNavigate ici

  const DeleteFormation = (e,id)=>{
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this formation!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`/api/delete_formation/${id}`).then(response => {
          // Handle the response data
          if(response.data.status === 200){
            swal("Success",response.data.message , 'success');
            axios.get(`/api/formations`).then(response => {
              // Handle the response data
              if(response.data.status === 200){
                setViewFormation(response.data.formations)
      
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
      field: "title",
      headerName: "Nom de Formation",
      flex: 1,
    },
    {
      field: "idEnseignant",
      headerName: "Ensegnant Id",
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
      headerName: "Dureé de Formation",
      flex: 1,
    },
    {
      field: "",
      headerName: "Ajoute Cour",
      flex: 1,
      renderCell: (params) => {
        const handleClick = () =>
          navigate(`/enseignant/Add_Cours/${params.row.id}`);
        return (
          <Box
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >     
            <Button type="submit" color="secondary"onClick={handleClick} >
              <AddIcon /> 
            </Button>     
      
          </Box>
        );
      }
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
        const handleClick = () =>
          navigate(`/enseignant/update_Formation/${params.row.id}`);
        return (
          <Box
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >     
            <Button type="submit" onClick={(e) => DeleteFormation(e, params.row.id)} color="secondary">
              <DeleteIcon className="delateIcon" /> 
            </Button>

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
          m="20px ">
          <Box width="100%" alignItems="center">
            <Box m="20px">
              <Box
                m="40px 0 0 0"
                height="75vh"
              >
                <DataGrid checkboxSelection rows={ViewFormation} columns={columns} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Formation;
