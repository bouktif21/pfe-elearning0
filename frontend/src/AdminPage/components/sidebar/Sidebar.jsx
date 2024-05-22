import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap,FaTh, FaUser, FaUsers, FaUserPlus, FaPlus } from 'react-icons/fa'; // Importing necessary icons
import logo from "../../../assets/logo.png"
import { useState,useEffect } from 'react';
const Sidebar = () => {
  const [useName, setUserName] = useState(null);
  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('auth_USER');
    console.log(storedData)
    // Check if data exists in local storage
    if (storedData) {
      // Parse the data if it exists
      const parsedData = JSON.parse(storedData);
      // Update the state with the retrieved data
      setUserName(parsedData.lastname);
    }
  }, []);

  return (
    <div>
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ maxHeight: '200vh', overflowY: 'auto' }}>
    <Link to="/admin" className="brand-link" style={{ textDecoration: "none" }}>
        <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className=" font-weight-light">{useName}</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex" >
          <ul > {/* Add paddingTop here */}
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/admin" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaTh className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Dashboard </p>
              </Link>
            </li>
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/admin/profile" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaUser className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Profile </p>
              </Link>
            </li>
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/admin/etudiant_list" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaUsers className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Liste d'Etudiant</p>
              </Link>
            </li> 
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/admin/enseignant_list" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaUsers className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Liste d'Enseignant</p>
              </Link>
            </li> 
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/admin/add_user" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaUserPlus className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Ajoute Utilisateur</p>
              </Link>
            </li>
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/admin/Add_formation" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaPlus className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Ajouter Formation</p>
              </Link>
            </li>
            <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
              <Link to="/admin/liste_formation" className="nav-link" style={{display: 'flex', alignItems: 'center'}}>
                <FaGraduationCap className="nav-icon" />
                <p style={{marginBottom: 9, marginLeft: 5}}>Liste de formation</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
  


  );
};

export default Sidebar;
