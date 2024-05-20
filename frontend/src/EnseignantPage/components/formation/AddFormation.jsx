import React, { useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import axios from "axios"
import swal from 'sweetalert';
import {  useNavigate } from "react-router-dom";
function AddFormation() {

  const navigate = useNavigate();
  const [enseignantId,setenseignantId]=useState("");
  console.log(enseignantId)
  useEffect(() => {
    const storedData = localStorage.getItem('auth_USER');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setenseignantId(parsedData.id );
    }
  }, []);
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [duree, setduree] = useState('');
    const [price, setprice] = useState('');
    let errorMessage = ""; // define errorMessage variable here
    const AddFormation = async (e) =>{
      e.preventDefault();
    if (!name || !description || !duree || !price ) {
      errorMessage = "All fields are required"; // update errorMessage value
    }
    if (errorMessage) {
      alert(errorMessage);
    } else {  

    try{
      axios.get('/sanctum/csrf-cookie').then(response => {
         axios.post(`/api/Add_formations`, { name,description,duree,price,enseignantId}).then(res => {
            if(res.data.status === 200){
                    setname("");
                    setdescription("");
                    setduree("");
                    setprice("");
                    swal("Success",res.data.message,"success");
                    navigate('/enseignant/liste_formation');

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
      <form style={{marginTop:"50px"}}onSubmit={AddFormation}>
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
        {errorMessage && <p>{errorMessage}</p>}

        <Box p="20px" mt="20px">
                            <Button style={{backgroundColor:'rgb(21, 170, 150)'}} type="submit" color="secondary" variant="contained">
                            Ajouter Formation
                            </Button>
            </Box>    

        </form>
    </div>  )
}

export default AddFormation