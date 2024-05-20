import { Box, Button } from "@mui/material";
import { useState,useEffect } from "react";
import { useNavigate ,useParams} from 'react-router-dom';
import Header from "../sidebar/Header";
import axios from "axios"
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt} from '@fortawesome/free-solid-svg-icons'
import './PublicCours.scss'

const ModifierUtilisateur = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const[image,setImage] = useState('');
    const[fisrtname, setfisrtname] =useState("");
    const[lastname, setlastname] =useState("");
    const[email, setEmail] =useState("");
    const[phone, setPhone] =useState("");
    const[role, setRole] =useState("");
    const [file ,setFile] =useState();
    let errorMessage = ""; // define errorMessage variable here

    
   
    useEffect(() => {
      axios.get(`/api/get_user/${id}`).then(response => {
        // Handle the response data
        
        if (response.data.status === 200) {
          console.log(response.data.user)
          setfisrtname(response.data.user.fisrtname);
          setlastname(response.data.user.lastname);
          setEmail(response.data.user.email);
          setPhone(response.data.user.phone);
          setRole(response.data.user.role);
          setImage(response.data.user.image)
        }
      });
    }, [id]);
    const handleUpdate = async (e) =>{
      e.preventDefault();
    // rest of the code
  
    if (!fisrtname || !email || !phone || !role || !lastname ) {
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
          axios.post(`/api/AdminUpdate_user/${id}`, { fisrtname,email,phone,role,lastname,file},config).then(res => {
            if(res.data.status === 200){
                    
                      swal("Success",res.data.message,"success");
                      navigate('/admin/enseignant_list');
  
                    }
                 });  
            
  
      } catch(e){
                     console.log(e)
                    }
  
                  }
  
    }
  return (
    <>
        <Box m="20px">
        <Header title="Bienvenue sur votre page Modifier"subtitle=" " />
        <Box className="Ajouter_User_form" ml="100px">
        <form  onSubmit={handleUpdate}>
        <Box m="20px">
                <img 
                alt="img"
                width="100px"
                height="100px"
                src={"http://127.0.0.1:8000/uploads/profile/"+image}/>
              </Box>
            <input 
            type="text" 
            placeholder="nom et prénom"
            value={fisrtname}
            onChange={(e)=>setfisrtname(e.target.value)}
            />
             <input 
            type="text" 
            placeholder="nom et prénom"
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
          

            <div className="input-group mb-3">
                <label className="input-group-text" >Role</label>
                <select  value={role} onChange={(e)=>setRole(e.target.value)} className="formSelect" >
                <option  >Choose...</option>
                <option value="Eleves">Etudiant</option>
                <option value="Admin">Admin</option>
                <option value="Enseignant">Enseignant</option>

                </select>
            </div>
 
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
            {errorMessage && <p>{errorMessage}</p>}

            <Box p="20px" mt="20px">
                            <Button style={{ backgroundColor: 'rgb(21, 170, 150)' }}type="submit" color="secondary" variant="contained">
                            Modifier Utilisateur
                            </Button>
            </Box>

        </form>
        </Box>

        </Box>
    </>
  )
}

export default ModifierUtilisateur