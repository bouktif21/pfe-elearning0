import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, Button, Grid, TextField,} from "@mui/material";
import swal from 'sweetalert';

function AddCourEnLigne() {
    const [formationOptions, setFormationOptions] = useState([]);
    const [FormationId, setFormationId] = useState("");
    const [url , setUrl] = useState("")
    const [enseignant_id, setenseignant_id] = useState("");
    const [date, setdate] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('url', url);
        formData.append('FormationId', FormationId);
        formData.append('date', date);

        try{
            axios.post(`/api/AjouteCoursEnLigne`,formData).then(res => {
                      if(res.data.status === 200){
                        setUrl("");
                        setdate("");
                        setFormationId("");
                        swal("Success",res.data.message,"success");
    
                      }
                   });  
              
    
        } catch(e){
                       console.log(e)
                      }
    
    
    
      };
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
  return (
    <>
            <form onSubmit={handleSubmit}>

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
  <div>
  <label>Url formation</label>
        <input 
            type='text' 
            style={{ width: 250 , marginLeft:9 }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
       />
  </div>
       
       <div >
       <label>Date :</label>
       <input 
            type='date' 
            value={date}
            style={{ width: 250 , marginLeft:9 }}

            onChange={(e) => setdate(e.target.value)}
       />
       </div>
       
        <Box p="20px" mt="20px">
                            <Button type="submit" color="secondary" style={{ backgroundColor: 'rgb(21, 170, 150)' }}variant="contained">
                            Ajouter Cours
                            </Button>
                </Box>
            </form>

    </>


  )
}

export default AddCourEnLigne