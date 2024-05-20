import { Box, Button } from "@mui/material";
import "./style.css"
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import swal from 'sweetalert';
const EnseignantIndex = () => {      
  const [viewEnseignant , setViewEnseignant] = useState([])
  useEffect(()=>{

    axios.get(`/api/user`).then(response => {
        // Handle the response data
        if(response.data.status === 200){
          setViewEnseignant(response.data.enseignant)

        }
    })
 
  },[]);

  const deleteUser = (e,id)=>{
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this module!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`/api/delete_user/${id}`).then(response => {
          // Handle the response data
          if(response.data.status === 200){
            swal("Success",response.data.message , 'success');
            axios.get(`/api/user`).then(response => {
              // Handle the response data
              if(response.data.status === 200){
                setViewEnseignant(response.data.enseignant)
      
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
    { field: "id", headerName: "ID" },
    {
      field: "fisrtname",
      headerName: "Prénom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "Nom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const handleClick = () =>
        navigate(`/admin/update_user/${params.row.id}`);
        return (
          <Box
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >     
            <Button type="submit" onClick={(e) => deleteUser(e, params.row.id)} color="secondary">
                <DeleteIcon className="delateIcon" /> 
            </Button>



            <Button type="submit" color="secondary"onClick={handleClick} >
            < UpdateIcon /> 
            </Button>     
      
          </Box>
        );}} ];
  const navigate = useNavigate();
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
                  <DataGrid checkboxSelection rows={viewEnseignant} columns={columns} />
                </Box>
                    </Box>
              </Box>

          </Box>
      </Box>
    </>
  )
}

export default EnseignantIndex