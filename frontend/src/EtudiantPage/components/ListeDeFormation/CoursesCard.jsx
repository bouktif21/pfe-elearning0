import React, { useEffect, useState } from "react";
import axios from 'axios';
import logo from "../../../assets/logo.png";
import "./courses.css";
import swal from 'sweetalert';

const CoursesCard = () => {
  const [viewFormation, setViewFormation] = useState([]);
  const [student_id, setStudentId] = useState('');

  useEffect(() => {
    axios.get(`/api/Etudiant_get_formation`)
      .then(response => {
        if (response.data.status === 200) {
          setViewFormation(response.data.formations);
        }
      })
      .catch(error => {
        console.error('Error fetching formations:', error);
      });
  }, []); // Removed viewFormation from the dependency array

  useEffect(() => {
    const storedData = localStorage.getItem('auth_USER');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStudentId(parsedData.id);  
    }
  }, []);

  const handleClick = (id) => {
    const data = {
      student_id: student_id, 
      status: 0, // Assuming status is a number
      formation_id: id 
    };

    axios.post(`/api/Etudiant_iscription`, data)
      .then(res => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
        } else {
          swal("Error", res.data.message, "error");
        }
      })
      .catch(error => {
        console.error('Error posting data:', error);
        swal("Error", "An error occurred while processing your request", "error");
      });
  };

  return (
    <>
      <section className='coursesCard'>
        <div className='container '>
          {viewFormation.map((val) => (
            <div className='items' key={val.id}>
              <div className='content flex'>
                <div className='left'>
                  <div className='img'>
                    <img src={logo} alt='' />
                  </div>
                </div>
                <div className='text'>
                  <h1>{val.title}</h1>
                  <p>{val.description}</p>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <label htmlFor=''>(5.0)</label>
                  </div>
                  <div className='details'>
                    <>
                      <div className='box'>
                        <div className='dimg'>
                          <img src={"http://127.0.0.1:8000/uploads/profile/"+val.enseignant.image} alt='' />
                        </div>
                        <div className='para'>
                          <h4>{val.enseignant.firstname +" "+ val.enseignant.lastname}</h4>
                          <h6>{val.enseignant.email}</h6>
                        </div>
                      </div>
                      <span>{val.length}</span>
                    </>
                  </div>
                </div>
              </div>
              <div className='price'>
                <h3>
                  {val.price} / 20dt par mois
                </h3>
              </div>
              <button className='outline-btn' onClick={() => handleClick(val.id)}>Participer</button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CoursesCard;
