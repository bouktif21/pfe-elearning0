import React from 'react'
import { Box, Button } from "@mui/material";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import swal from 'sweetalert';
function Reunion() {
  const [viewReunion , setViewReunion] = useState([])
  const [FormationId, setFormationId] = useState("");
  const [enseignant_id, setenseignant_id] = useState("");
  const [formationOptions, setFormationOptions] = useState([]);
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
  useEffect(()=>{
    if (FormationId){

    axios.get(`/api/CoursEnLigne/${FormationId}`).then(response => {
        // Handle the response data
        if(response.data.status === 200){
          setViewReunion(response.data.Reuions)
          console.log(viewReunion)
        }
    })
  }
  },[FormationId]);

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
        axios.delete(`/api/delete_Reunion/${id}`).then(response => {
          // Handle the response data
          if(response.data.status === 200){
            swal("Success",response.data.message , 'success');
            axios.get(`/api/CoursEnLigne/${FormationId}`).then(response => {
              // Handle the response data
              if(response.data.status === 200){
                setViewReunion(response.data.Reuions)
      
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
      field: "url",
      headerName: "Url réunion",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const handleClick = () =>
        navigate(`/enseignant/Modifier_cour_en_ligne/${params.row.id}`);
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
<div className="input-group mt-1" style={{ marginLeft: '100px' }}>
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
                  <DataGrid checkboxSelection rows={viewReunion} columns={columns} />
                </Box>
                    </Box>
              </Box>

          </Box>
      </Box>
    </>  )
}

export default Reunion