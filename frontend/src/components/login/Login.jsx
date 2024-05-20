import {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import axios from "axios"
import swal from 'sweetalert';
import {  useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const[email, setEmail] =useState("");
  const[password, setPassword] =useState("");
 
   // api call
   const handlelogin = async (e)  =>{   
       e.preventDefault();


      try{
         
         axios.get('/sanctum/csrf-cookie').then(response => {
             axios.post(`/api/login`, {email,password }).then(resp => {
                 if(resp.data.status === 200){
                  localStorage.setItem('auth_token',resp.data.token);
                  localStorage.setItem('auth_USER',JSON.stringify(resp.data.authUser));

                   
                   setEmail("");
                   setPassword("");
                   swal("Success",resp.data.message,"success");
                   if(resp.data.auth_role === 'Admin')
                   {
                     navigate('/admin');
                  }
                  else if (resp.data.auth_role === 'Enseignant'){
                     navigate('/enseignant');

                  }
                  else if (resp.data.auth_role === 'Parent'){
                     navigate('/parent');

                  }
                   else
                   {
                     navigate('/eleve');
                  }

                 }
                 else if(resp.data.status === 401){
                    
                  swal("warning",resp.data.message,"warning");
                 }
                 else{
                  swal("warning","verifier you email or password ");

                 }
              });  
         
         });

   } catch(e){
                  console.log(e)
                 }
  }
 
  return (
   <>
    <div className="log ">
            <div className="wrapperlog ">
            <h1>Login</h1>
            <form  onSubmit={handlelogin} >
               <input 
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Email"
                  />
               <input 
                  type="password" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Password"

                  />
            
            <button type="Submit">Login</button>
            
            </form>
            <div className="member">
               Already a member ? <a href="/Registre">Regisyre Here</a>
            </div>

            </div>
            

      </div>
      
      </>  )
}

export default Login