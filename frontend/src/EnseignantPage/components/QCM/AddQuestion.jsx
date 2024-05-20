
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
const AddQuestion = () => {
  const {QcmId}=useParams();

  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const navigate = useNavigate();

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuiz = {
      QcmId,
      question,
      answerOptions,
      correctAnswer,
    };

    axios.post('/api/Add_question', newQuiz)
      .then(response => {
        console.log(response);
        swal("Success",response.data.message,"success");
        navigate('/Enseignant/liste_qcm');
        setQuestion('');
        setAnswerOptions(['', '', '', '']);
        setCorrectAnswer('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Ajouter Nouvelle QCM</h1>
      <form onSubmit={handleSubmit}>

        <label>
          Question:
          <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />
        </label>
        <label>
          Answer Options:
          {answerOptions.map((option, index) => (
            <input
              key={index} // Unique key prop for each input
              type="text"
              value={option}
              onChange={e => {
                const newAnswerOptions = [...answerOptions];
                newAnswerOptions[index] = e.target.value;
                setAnswerOptions(newAnswerOptions);
              }}
            />
          ))}
        </label>
        <label>
          Correct Answer:
          <input type="text" value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)} />
        </label>
        <Box p="20px" mt="20px">
          <Button style={{ backgroundColor: 'rgb(21, 170, 150)' }} type="submit" color="secondary" variant="contained">
            Ajouter Question
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddQuestion;
