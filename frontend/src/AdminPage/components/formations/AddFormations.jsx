import React, { useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import axios from "axios"
import swal from 'sweetalert';
import {  useNavigate } from "react-router-dom";
function AddFormations() {
    const navigate = useNavigate();
    const [enseignantId,setenseignantId]=useState("");
    const [enseignant,setenseignant]=useState([]);
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [duree, setduree] = useState('');
    const [price, setprice] = useState('');
    const [file,setFile]= useState("")
    let errorMessage = ""; // define errorMessage variable here
  
  
    console.log(enseignant)
    useEffect(()=>{
      axios.get(`/api/user`).then(response => {
          // Handle the response data
          if(response.data.status === 200){
            setenseignant(response.data.enseignant)
          }
      })
   
    },[]);
  
  
  
     
      const Formation = async (e) =>{
        e.preventDefault();
      if (!name || !description || !duree || !price||!file ) {
        errorMessage = "All fields are required"; // update errorMessage value
      }
      if (errorMessage) {
        alert(errorMessage);
      } else {  
  
      try{
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        axios.get('/sanctum/csrf-cookie').then(response => {
           axios.post(`/api/Add_formations`, { name,description,duree,price,enseignantId,file},config).then(res => {
              if(res.data.status === 200){
                      setname("");
                      setdescription("");
                      setduree("");
                      setprice("");
                      swal("Success",res.data.message,"success");
                      navigate('/admin/liste_formation');
  
                    }
                 });  
            
            });
  
      } catch(e){
                     console.log(e)
                    }
  
                  }
                }
  
  return (
    <div>
    <h1>Ajoute Nouvelle Formation</h1>
    <form style={{marginTop:"50px"}}onSubmit={Formation}>
    <div className="input-group mb-3 mt-2" >
      <label className="input-group-text">Enseignant</label>
      <select
        value={enseignantId}
        onChange={(e) => setenseignantId(e.target.value)}
        className="formSelect"
      >
        <option>Choose...</option>
        {enseignant.map(option => (
          <option  key={option.id} value={option.id}>{option.fisrtname+" "+option.lastname}</option>
        ))}
      </select>
    </div>
      <label>
        Nom de Formation:
        <input type="text" value={name} onChange={e => setname(e.target.value)} />
      </label>
      <label>
        Dexription:
        <input type="text" value={description} onChange={e => setdescription(e.target.value)} />
      </label>
      <label>
      
      Durée du cours:
        <input type="text" value={duree} onChange={e => setduree(e.target.value)} />
      </label>
      <label>
        Prix:
        <input type="text" value={price} onChange={e => setprice(e.target.value)} />
      </label>
      <label>
        Video:
        <input type="file" name="file"onChange={(e)=>setFile(e.target.files[0])}/>
      </label>
      {errorMessage && <p>{errorMessage}</p>}

      <Box p="20px" mt="20px">
                          <Button style={{backgroundColor:'rgb(21, 170, 150)'}} type="submit" color="secondary" variant="contained">
                          Ajouter Formation
                          </Button>
          </Box>    

      </form>
  </div>  )
}

export default AddFormations