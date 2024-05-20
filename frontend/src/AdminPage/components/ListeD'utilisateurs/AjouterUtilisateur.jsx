import { Box, Button } from "@mui/material";
import {useState } from "react"
import {  useNavigate } from "react-router-dom";
import axios from "axios"
import swal from 'sweetalert';
import './PublicCours.scss'
import Header from "../sidebar/Header"
const AjouterEnseignant = () => {

    const navigate = useNavigate();
    const[fisrtname, setfisrtname] =useState("");
    const[lastname, setlastname] =useState("");
    const[email, setEmail] =useState("");
    const[phone, setPhone] =useState("");
    const[password, setPassword] =useState("");
    const[role, setRole] =useState("");
    let errorMessage = ""; // define errorMessage variable here

    
   
  
    const handleRegister = async (e) =>{
      e.preventDefault();
    // rest of the code
  
    if (!fisrtname||!lastname || !email || !password || !phone || !role ) {
      errorMessage = "All fields are required"; // update errorMessage value
    }
    if (errorMessage) {
      alert(errorMessage);
    } else {  
      try{
        axios.get('/sanctum/csrf-cookie').then(response => {
          axios.post(`/api/register`, { fisrtname,lastname,email,phone,password,role}).then(res => {
            if(res.data.status === 200){
                      localStorage.setItem('auth_token',res.data.token);
                      localStorage.setItem('auth_name',res.data.username);
                      setfisrtname("");
                      setlastname("");
                      setEmail("");
                      setPhone("");
                      setPassword("");
                      setRole("");
                      swal("Success",res.data.message,"success");
                      navigate('/admin/add_user');
  
                    }
                 });  
            
            });
  
      } catch(e){
                     console.log(e)
                    }
  
                  }
  
    }
  return (
    <>
        <Box m="20px">
        <Header title="Ajouter Nouvelle Utilisateur"   />
        <Box className="Ajouter_User_form" ml="100px">
        <form  onSubmit={handleRegister}>
            <input 
            type="text" 
            placeholder="Prénom"
            value={fisrtname}
            onChange={(e)=>setfisrtname(e.target.value)}
            />
              <input 
            type="text" 
            placeholder="Nom"
            value={lastname}
            onChange={(e)=>setlastname(e.target.value)}
            />
  
            <input 
            type="email" 
            placeholder="Email adresse"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            
            <input 
            type="phone" 
            placeholder="Téléphone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            />
            <input 
            type="password" 
            placeholder="Mots de passe"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />

            <div className="input-group mb-3">
                <label className="input-group-text" >Role</label>
                <select  value={role} onChange={(e)=>setRole(e.target.value)} className="formSelect" >
                <option  >Choose...</option>
                <option value="Eleves">Etudiant</option>
                <option value="Admin">Admin</option>
                <option value="Enseignant">Enseignant</option>

                </select>
            </div>    
            {errorMessage && <p>{errorMessage}</p>}

            <Box p="20px" mt="20px">
                            <Button type="submit"  style={{ backgroundColor: 'rgb(21, 170, 150)' }} variant="contained">
                            Ajouter Utilisateur
                            </Button>
            </Box>

        </form>
        </Box>

        </Box>
    </>
  )
}

export default AjouterEnseignant