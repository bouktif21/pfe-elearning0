import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Appel API
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`/api/login`, { email, password }).then(resp => {
          if (resp.data.status === 200) {
            localStorage.setItem('auth_token', resp.data.token);
            localStorage.setItem('auth_USER', JSON.stringify(resp.data.authUser));

            setEmail("");
            setPassword("");
            swal("Succès", resp.data.message, "success");
            if (resp.data.auth_role === 'Admin') {
              navigate('/admin');
            } else if (resp.data.auth_role === 'Enseignant') {
              navigate('/enseignant');
            } else if (resp.data.auth_role === 'Parent') {
              navigate('/parent');
            } else {
              navigate('/eleve');
            }
          } else if (resp.data.status === 401) {
            swal("Attention", resp.data.message, "warning");
          } else {
            swal("Attention", "Vérifiez votre email ou mot de passe", "warning");
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="log">
        <div className="wrapperlog">
          <h1>Connexion</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
            />
            <button type="Submit">Connexion</button>
          </form>
          <div className="member">
            Déjà membre ? <a href="/Registre">Inscrivez-vous ici</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
