import React, { useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function UpdateFormation() {
  const { idFormation } = useParams();
  const navigate = useNavigate();
  const [enseignantId, setEnseignantId] = useState("");
  const [enseignants, setEnseignants] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duree, setDuree] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEnseignants = async () => {
      try {
        const response = await axios.get('/api/user');
        if (response.data.status === 200) {
          setEnseignants(response.data.enseignant);
        }
      } catch (error) {
        console.error("Error fetching enseignants:", error);
      }
    };

    const fetchFormation = async () => {
      try {
        const response = await axios.get(`/api/formation/${idFormation}`);
        if (response.data.status === 200) {
          const formation = response.data.formations;
          console.log(response.data.formations)
          setEnseignantId(formation.idEnseignant);
          setName(formation.title);
          setDescription(formation.description);
          setDuree(formation.length);
          setPrice(formation.price);
        }
      } catch (error) {
        console.error("Error fetching formation:", error);
      }
    };

    fetchEnseignants();
    fetchFormation();
  }, [idFormation]);

  const updateFormation = async (e) => {
    e.preventDefault();

    if (!name || !description || !duree || !price) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.put(`/api/update_formations/${idFormation}`, {
        name,
        description,
        duree,
        price,
        enseignantId
      });

      if (response.data.status === 200) {
        setName("");
        setDescription("");
        setDuree("");
        setPrice("");
        swal("Success", response.data.message, "success");
        navigate('/admin/liste_formation');
      } else {
        swal("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error updating formation:", error);
      swal("Error", "An error occurred. Please try again.", "error");
    }
  };

  return (
    <div>
      <h1>Update Formation</h1>
      <form style={{ marginTop: "50px" }} onSubmit={updateFormation}>
        <div className="input-group mb-3 mt-2">
          <label className="input-group-text">Enseignant</label>
          <select
            value={enseignantId}
            onChange={(e) => setEnseignantId(e.target.value)}
            className="formSelect"
          >
            <option>Choose...</option>
            {enseignants.map(option => (
              <option key={option.id} value={option.id}>
                {option.fisrtname + " " + option.lastname}
              </option>
            ))}
          </select>
        </div>
        <label>
          Nom de Formation:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Durée du cours:
          <input type="text" value={duree} onChange={e => setDuree(e.target.value)} />
        </label>
        <label>
          Prix:
          <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
        </label>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <Box p="20px" mt="20px">
          <Button style={{ backgroundColor: 'rgb(21, 170, 150)' }} type="submit" color="secondary" variant="contained">
            Update Formation
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default UpdateFormation;
