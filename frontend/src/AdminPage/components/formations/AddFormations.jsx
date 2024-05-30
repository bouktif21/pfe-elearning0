import React, { useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

function AddFormations() {
    const navigate = useNavigate();
    const [enseignantId, setEnseignantId] = useState("");
    const [enseignants, setEnseignants] = useState([]);
    const [name, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [duree, setDuree] = useState('');
    const [price, setPrix] = useState('');
    const [file, setFichier] = useState("");
    let messageErreur = ""; // définir la variable messageErreur ici

    useEffect(() => {
        axios.get(`/api/user`).then(response => {
            if(response.data.status === 200){
                setEnseignants(response.data.enseignant);
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !duree || !price || !file) {
            messageErreur = "Tous les champs sont obligatoires";
        }
        if (messageErreur) {
            alert(messageErreur);
        } else {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post(`/api/Add_formations`, { name, description, duree, price, enseignantId, file }, config).then(res => {
                        if (res.data.status === 200) {
                            setNom("");
                            setDescription("");
                            setDuree("");
                            setPrix("");
                            swal("Succès", res.data.message, "success");
                            navigate('/admin/liste_formation');
                        }
                    });
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div>
            <h1>Ajouter une Nouvelle Formation</h1>
            <form style={{ marginTop: "50px" }} onSubmit={handleSubmit}>
                <div className="input-group mb-3 mt-2">
                    <label className="input-group-text">Enseignant</label>
                    <select
                        value={enseignantId}
                        onChange={(e) => setEnseignantId(e.target.value)}
                        className="formSelect"
                    >
                        <option>Choisir...</option>
                        {enseignants.map(option => (
                            <option key={option.id} value={option.id}>{option.fisrtname + " " + option.lastname}</option>
                        ))}
                    </select>
                </div>
                <label>
                    Nom de la Formation:
                    <input type="text" value={name} onChange={e => setNom(e.target.value)} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <label>
                    Durée du Cours:
                    <input type="text" value={duree} onChange={e => setDuree(e.target.value)} />
                </label>
                <label>
                    Prix:
                    <input type="text" value={price} onChange={e => setPrix(e.target.value)} />
                </label>
                <label>
                    Vidéo:
                    <input type="file" name="file" onChange={(e) => setFichier(e.target.files[0])} />
                </label>
                {messageErreur && <p>{messageErreur}</p>}

                <Box p="20px" mt="20px">
                    <Button style={{ backgroundColor: 'rgb(21, 170, 150)' }} type="submit" color="secondary" variant="contained">
                        Ajouter la Formation
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default AddFormations;
