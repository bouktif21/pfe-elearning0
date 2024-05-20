import React, { useState } from "react";
import './registre.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

const Registre = () => {
  const navigate = useNavigate();
  const [fisrtname, setfisrtname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Ajout du state pour le champ de confirmation de mot de passe
  const [terms, setTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    if (!fisrtname || !email || !password || !phone || !lastname || !terms) {
      setErrorMessage("Tous les champs sont requis.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`/api/register`, { fisrtname, lastname, email, phone, password, role: "Etudiant" }).then(res => {
          if (res.data.status === 200) {
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.username);
            setfisrtname("");
            setlastname("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirmPassword("");
            setErrorMessage("");
            swal("Success", res.data.message, "success");
            navigate('/login');
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/[^0-9]/g, '');
    setPhone(numbersOnly);
  }

  return (
    <div className="dby">
      <div className=" wrapper">
        <h1>Registration</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First name"
            value={fisrtname}
            onChange={(e) => setfisrtname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="terms">
            <input
              type="checkbox"
              id="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label style={{ color: 'black' }}>I agree with <a href="#"> terms & conditions</a></label>
          </div>

          <button type="submit">Sign Up</button>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>

        <div className="member">
        Already a member ? <a href="/Login">Login here</a>
        </div>

      </div>

    </div>
  )
}

export default Registre;
