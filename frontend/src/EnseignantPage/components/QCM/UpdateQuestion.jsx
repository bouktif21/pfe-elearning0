
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
const UpdateQuestion = () => {
  const {QuestionId,qcmId}=useParams();

  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/get_question_par_id/${QuestionId}`)
      .then(response => {
        if (response.status === 200) {
            setQuestion(response.data.question.question);
            setAnswerOptions(response.data.question.answer_options || []);
            setCorrectAnswer(response.data.question.correct_answer);


        }
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [QuestionId]);

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
        QcmId:qcmId,
        question,
        answerOptions,
        correctAnswer,
    };

    axios.put(`/api/Update_question/${QuestionId}`, newQuestion)
      .then(response => {
        console.log(response);
        swal("Success",response.data.message,"success");
        navigate(`/Enseignant/view_Qestion/${qcmId}`);

      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Modifier  Question</h1>
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
            Modifier Question
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default UpdateQuestion;
