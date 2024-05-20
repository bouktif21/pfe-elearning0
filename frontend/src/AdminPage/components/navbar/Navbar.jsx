
import {  useNavigate } from "react-router-dom";
import axios from "axios"
import swal from 'sweetalert';

const Navbar = () => {
  const navigate = useNavigate();

  const logoutSubmit = async (e)  =>{   
    e.preventDefault();

    axios.post(`/api/adminlogout`).then(resp => {
      if(resp.data.status === 200){
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_USER');
        swal("Success",resp.data.message,"success");
        navigate('/');


      }
    }); 
  }
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3.html" className="nav-link">Home</a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">Contact</a>
        </li>
      </ul>
  
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button 
              className="nav-link" 
              data-widget="control-sidebar"        
              style={{ marginRight: '30px' }} // Add left margin here
              onClick={logoutSubmit} data-controlsidebar-slide="true"  >
                   <span>logout</span>
 <i className="fas fa-sign-out-alt"></i>
          </button>
        </li>
      </ul>
    </nav>
     );
}

export default Navbar



