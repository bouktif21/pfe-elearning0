import { Box, Button, Grid, TextField,} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const authUser = JSON.parse(localStorage.getItem('auth_USER'));
  let errorMessage = ""; // define errorMessage variable here

  const id =authUser.id;
  const role = authUser.role;
  const [fisrtname, setfisrtname] = useState("");
  const [lastname, setlastname] = useState("");
  const [image, setimage] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [file ,setFile] =useState();

  useEffect(() => {
    axios.get(`/api/Enseignant_get_data/${id}`).then(response => {
      // Handle the response data
      if (response.data.status === 200) {
        console.log(response.data.user)
        setlastname(response.data.user.lastname);
        setfisrtname(response.data.user.fisrtname)
        setEmail(response.data.user.email);
        setPhone(response.data.user.phone);
        setaddress(response.data.user.address);
        setcountry(response.data.user.country);
        setimage(response.data.user.image)

      }
    });
  }, [id]);

  const handleUpdateUserData = () => {
   
 
  if (!fisrtname || !email || !phone  || !lastname ) {
    errorMessage = "All fields are required"; // update errorMessage value
  }
  if (errorMessage) {
    alert(errorMessage);
  }else{
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

        axios.post(`/api/Update_profile/${id}`,  {  fisrtname,lastname, email,role, phone,address,country,file},config).then(res => {
          if(res.data.status === 200){
                  
            swal("Success", res.data.message, "success"); // Ensure the second argument is properly defined
            navigate('/Enseignant/profile');

                  }
               });  
    } catch (error) {
      console.log(error)

    }
  }
 
};

  const handleUpdatePassword = () => {
    axios.put(`/api/Enseignant_updatePassword/${authUser.id}`, { newPassword })
      .then(response => {
        if (response.data.status === 200) {
          swal("Success", response.data.message, "success");
        }
      })
      .catch(error => {
        console.error("Error updating password:", error);
      });
  };

  return (
    <Box m="20px">
      <Box className="Ajouter_User_form" ml="100px">
      <Box m="20px">
                <img 
                alt="img"
                width="100px"
                height="100px"
                src={"http://127.0.0.1:8000/uploads/profile/"+image}/>
              </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p><strong> Prénom:</strong> {fisrtname}</p>
            <TextField
              label="Nouveau Prénom"
              value={fisrtname}
              onChange={(e) => setfisrtname(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <p><strong>Nom :</strong> {lastname}</p>
            <TextField
              label="Nouveau Nom"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <p><strong>Adresse Email:</strong> {email}</p>
            <TextField
              label="Nouveau Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <p><strong>Téléphone:</strong> {phone}</p>
            <TextField
              label="Nouveau Telephone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <p><strong>pays:</strong> {country}</p>
            <TextField
              label="Nouveau pays"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <p><strong>Adresse:</strong> {address}</p>
            <TextField
              label="Nouveau Adresse"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
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
                      <div className="public-file-item" key={image}>
                        <FontAwesomeIcon icon={faFileAlt} />
                        <p>{image}</p>
                      </div>
                    )}
 
          <Grid item xs={12}>
            <Button variant="contained" style={{ backgroundColor: 'rgb(21, 170, 150)' }} onClick={handleUpdateUserData}>
              Mettre à jour les données
            </Button>

          </Grid>
          <Grid item xs={12}>
          <p><strong>Modified:</strong> Mot de Passe</p>
            <TextField
              label="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button variant="contained"style={{ backgroundColor: 'rgb(21, 170, 150)' }} onClick={handleUpdatePassword}>
              Mettre à jour le mot de passe
            </Button>
          </Grid>
          
        </Grid>

        
        
      </Box>
    </Box>
  );
}

export default Profile;
