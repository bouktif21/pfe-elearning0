import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, Button, Grid, TextField,} from "@mui/material";
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateReunion() {
    const navigate = useNavigate();
    const {formationId}=useParams();
    const [formationOptions, setFormationOptions] = useState([]);
    const [FormationId, setFormationId] = useState("");
    const [url , setUrl] = useState("")
    const [enseignant_id, setenseignant_id] = useState("");
    const [date, setdate] = useState("");
    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem('auth_USER'));
        setenseignant_id(authUser.id);
        if (formationId){

            axios.get(`/api/get_reunion_parId/${formationId}`).then(response => {
                // Handle the response data
                    setUrl(response.data.url)
                    setFormationId(response.data.FormationId)
                    setdate(response.data.date)
                
            })
          }
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


    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            axios.post(`/api/update_reunion/${formationId}`, { FormationId,url,date}).then(res => {
                      if(res.data.status === 200){
                        navigate(`/enseignant/cour_en_ligne`);
                        swal("Success",res.data.message,"success");
    
                      }
                   });  
              
    
        } catch(e){
                       console.log(e)
                      }
    
    
    
      };
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
                    Update Réunion
                    </Button>
        </Box>
    </form>

</>
)
}

export default UpdateReunion