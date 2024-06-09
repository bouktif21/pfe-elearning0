import { Box, Button, Grid, TextField, FormControl ,InputLabel, Select, MenuItem} from "@mui/material";
import {  useState } from 'react';
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt} from '@fortawesome/free-solid-svg-icons'

const AddCours = () => {
  const{FormationId} = useParams();
  const navigate = useNavigate();
  const [Name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState("")



  const userId = localStorage.getItem('auth_id');

 
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', Name);
    formData.append('description', description);
    formData.append('FormationId', FormationId);
    formData.append('file', file); 
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    try{
        axios.post(`/api/AjouteCours`,formData,config).then(res => {
                  if(res.data.status === 200){
                    setName("");
                    setDescription("");
                    swal("Success",res.data.message,"success");

                  }
               });  
          

    } catch(e){
                   console.log(e)
                  }



  };

  return (
    <>
        <Box m="20px">
         <Box  className="public_cours_form" ml="100px">
        <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
            <p><strong> Cour:</strong> </p>
            <TextField
              label="Nom de Cour"
              value={Name}
              onChange={(e)=>setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <p><strong> Description</strong></p>
            <TextField
              label="Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
             
          <Box   ml="15px" width="82%" >
                       <div className="file-card">
                           <div className="file-inputs">
                           <input type="file" onChange={(e)=>setFile(e.target.files[0])} name='file' />
                           </div>
                            <p className="main">Supported files</p>
                            <p className="info">PDF, JPG, PNG</p>

                        </div>
                   </Box>
                   {file ? (
  <div className="public-file-item" key={file.name}>
    <FontAwesomeIcon icon={faFileAlt} />
    <p>{file.name}</p>
  </div>
) : (
  <div className="public-file-item" >
    <FontAwesomeIcon icon={faFileAlt} />
  </div>
)}
                <Box p="20px" mt="20px">
                            <Button type="submit" color="secondary" style={{ backgroundColor: 'rgb(21, 170, 150)' }}variant="contained">
                            Ajouter Cours
                            </Button>
                </Box>
            </form>

            </Box>
            
            </Box>
        </>
  )
}

export default AddCours