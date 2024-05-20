import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TestQcm() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    axios.get(`/api/get_question_parQcmId/${id}`)
      .then(res => {
        if (res.status === 200) {
          setQuestions(res.data.questions);
        }
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // Clear timer when timeLeft is 0
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers(prevState => ({
      ...prevState,
      [questionId]: selectedAnswer
    }));
  };

  const handleSubmit = () => {
    let totalCorrect = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correct_answer) {
        totalCorrect++;
      }
    });
    const totalQuestions = questions.length;
    const calculatedScore = (totalCorrect / totalQuestions) * 100;
    setScore(calculatedScore);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleShowResult = () => {
    handleSubmit();
    alert(`Your score: ${score}%`);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1 style={{textAlign:"center", marginBottom:"10px"}}>Quiz</h1>
      {currentQuestion && (
        <div className="card" style={{marginLeft:"20px"}}>
          <h3 style={{marginLeft:"30px"}}>{currentQuestion.question} : </h3>
          {currentQuestion.answer_options.map(answer => (
            <div key={answer} style={{marginLeft:"90px"}}>
              <input
                type="radio"
                id={answer}
                name={`question_${currentQuestion.id}`}
                value={answer}
                onChange={() => handleAnswerChange(currentQuestion.id, answer)}
                checked={answers[currentQuestion.id] === answer}
              />
              <label htmlFor={answer} style={{marginLeft:"15px"}}>{answer}</label>
            </div>
          ))}
          <div>
            <button onClick={handlePreviousQuestion} style={{margin: '10px', padding:"10px 10px" ,borderRadius: '5px', backgroundColor: '#1eb2a6', color: 'white' }}  disabled={currentQuestionIndex === 0}>
              Previous Question
            </button>
            <button onClick={handleNextQuestion} style={{margin: '10px', padding:"10px 10px" ,borderRadius: '5px', backgroundColor: '#1eb2a6', color: 'white' }} disabled={currentQuestionIndex === questions.length - 1}>
              Next Question
            </button>
          </div>
          {currentQuestionIndex === questions.length - 1 && (
            <div>
              <button onClick={handleShowResult}style={{margin: '10px', padding:"10px 10px" ,borderRadius: '5px', backgroundColor: '#1eb2a6', color: 'white' }} >Generate Result</button>
            </div>
          )}
        </div>
      )}
      {score !== null && (
        <div>
          <h2>Your Score: {score}%</h2>
        </div>
      )}
      <div>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
    </div>
  );
}

export default TestQcm;
