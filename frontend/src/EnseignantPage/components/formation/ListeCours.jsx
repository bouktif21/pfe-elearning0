import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box } from "@mui/material";
import Pdf from "./Pdf";
import "./cour.css";

function ListeCours() {
  const [formationOptions, setFormationOptions] = useState([]);
  const [FormationId, setFormationId] = useState("");
  const [enseignant_id, setenseignant_id] = useState("");
  const [cour , setCour] = useState([]);
  const [pdfUrls, setPdfUrls] = useState([]);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('auth_USER'));
    setenseignant_id(authUser.id);

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

  useEffect(() => {
    // Fetch courses when FormationId changes
    if (FormationId){
      axios.get(`/api/get_cour_par_Formation_id/${FormationId}`).then(response => {
        if (response.data.status === 200) {
          setCour(response.data.Cour);
          const urls = response.data.fileNames.map(fileName => `/pdf/${response.data.Cour.file}`); // Adjust the path as needed
          setPdfUrls(urls);
        }
      });
    }
  }, [FormationId]);

  return (
    <>
      <div className="input-group mb-3">
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
      <Box m="20px">
        <Box className='pdf'>
          {cour && cour.map((Item) => ( // Add conditional check for 'cour'
            <Box ml="20px" key={Item.id}>
              <Pdf  className="file" />

            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default ListeCours;
