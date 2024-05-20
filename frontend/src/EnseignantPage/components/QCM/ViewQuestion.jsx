import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
function ViewQuestion() {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
 const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/get_question/${id}`)
      .then(response => {
        if (response.status === 200) {
          setQuestions(response.data.questions);
        }
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [id]);

  const handleDeleteQuestion = (e,questionId) => {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this formation!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/api/delete_question/${questionId}`).then(response => {
          if (response.data.status === 200) {
            swal("Success", response.data.message , 'success');
            axios.get(`/api/get_question/${id}`).then(response => {
              if (response.data.status === 200) {
                setQuestions(response.data.questions);
              }
            });      
          }
        })
      } else {
        swal("Your Question is safe!");
      }
    });
  };

  const handleUpdateQuestion = (questionId) => {
    navigate(`/enseignant/Update_Qestion/${questionId}/${id}`)
    };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        View Questions
      </Typography>
      {questions.map(question => (
        <Box key={question.id} mb={2} p={2} border="1px solid #ccc">
          <Typography variant="h4">Question: {question.question}</Typography>
          <Typography variant="h6">Options:</Typography>
          <ul>
            {question.answer_options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
          <Typography variant="body1">Correct Answer: {question.correct_answer}</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleUpdateQuestion(question.id)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={(e) => handleDeleteQuestion(e, question.id)}
            sx={{ marginLeft: '10px' }}
          >
            Delete
          </Button>
        </Box>
      ))}
    </div>
  );
}

export default ViewQuestion;
