import React, { useCallback, useRef, useState } from 'react';
import certificateTemplate from '../../../assets/Certificate.png';
import { useParams } from 'react-router-dom';
import { toPng } from 'html-to-image';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt} from '@fortawesome/free-solid-svg-icons'
import { Box, Button, Grid, TextField, FormControl ,InputLabel, Select, MenuItem} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
function Certife() {
    let errorMessage = ""; // define errorMessage variable here
    const navigate = useNavigate();
    const { nom, prenom, formation, id } = useParams(); // Make sure 'id' is extracted from useParams
    const ref = useRef(null);
    const [file ,setFile] =useState();
    const [image, setimage] = useState("");
    const [description, setDescription] = useState("");

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return;
        }

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${nom}-${prenom}.png`; // Concatenate nom and prenom for filename
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [nom, prenom, ref]);

    const handleSubmit = () => {
   
 
        if (!description || !file  ) {
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
      
              axios.post(`/api/add_certificate`,  {  id,description,file},config).then(res => {
                if(res.data.status === 200){
                        
                  swal("Success", res.data.message, "success"); // Ensure the second argument is properly defined
                  navigate('/Enseignant/');
      
                        }
                     });  
          } catch (error) {
            console.log(error)
      
          }
        }
       
      };

   

  

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div ref={ref} className='container' style={{ position: 'relative' }}>
                <img src={certificateTemplate} height={400} alt="Certificate" />
                <div className='content' style={{ position: 'absolute', top: '44%', left: '30%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
                    <h1>{nom + ' ' + prenom}</h1>
                </div>
                <div className='content' style={{ position: 'absolute', top: '57%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
                    <h6>{formation}</h6>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button style={{ padding: '10px 20px',backgroundColor: 'rgb(21, 170, 150)' , color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={onButtonClick}>
                    Print Certificate
                </button>
            </div>
            <Grid container spacing={2}style={{marginLeft:"20px"}}>
            <Grid item xs={12}>
            <p><strong> Description:</strong></p>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                      <div className="public-file-item" style={{display:'flex',backgroundColor: 'rgb(158, 216, 208)',borderRadius:'4px' }}key={file.name}>
                        <FontAwesomeIcon style={{marginRight:'20px', marginLeft:'20px',marginTop:'10px'}}icon={faFileAlt} />
                        <p style={{marginRight:'40px'}}>{file.name}</p>
                      </div>
                    ) : (
                      <div className="public-file-item" >
                      </div>
                    )}
              </Grid>
              <div style={{ textAlign: 'center', marginTop: '20px' ,marginBottom:'20px'}}>
                <button style={{ padding: '10px 20px',backgroundColor: 'rgb(21, 170, 150)' , color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleSubmit}>
                    Envoyer Certificate
                </button>
            </div>
        </div>
    );
}

export default Certife;
