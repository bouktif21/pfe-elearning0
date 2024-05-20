import "./App.css"
import Header from "./AdminPage/components/sidebar/Header"
import { BrowserRouter as Router,Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import SigneUp from "./components/signeUp/Registre"
import AdminHome from "./AdminPage/MasterLayout/MasterLayout"
import AdminPrivateRoutes from "./AdminPage/AdminPrivateRoutes"
import AdminDashboard from "./AdminPage/components/Dashboard/Dashboard"
import AdminProfile from './AdminPage/components/profil/Profile'
import EnseignantIndex from "./AdminPage/components/ListeD'utilisateurs/EnseignantIndex"
import EtudiantIndex from "./AdminPage/components/ListeD'utilisateurs/EtudiantIndex"
import AddUser from "./AdminPage/components/ListeD'utilisateurs/AjouterUtilisateur"
import ModifierUtilisateur from "./AdminPage/components/ListeD'utilisateurs/ModifierUtilisateur"

import EnseignantPrivateRoutes from "./EnseignantPage/EnseignantPrivateRoutes"
import EnseignantHome from './EnseignantPage/MasterLayout/MasterLayout'
import EtudiantPrivateRoutes from './EtudiantPage/EtudiantPrivateRoutes'
import EtudiantHome from './EtudiantPage/MasterLayout/MasterLayout'
import axios from 'axios';
import Dashboard from "./EnseignantPage/components/dashboard/Dashboard"
import EnseignantProfile from "./EnseignantPage/components/profil/Profile"
import AddQcm from "./EnseignantPage/components/QCM/AddQcm"
import Qcm from "./EnseignantPage/components/QCM/Qcm"
import Formation from "./EnseignantPage/components/formation/Formation"
import AddFormation from "./EnseignantPage/components/formation/AddFormation"
import UpdateQcm from "./EnseignantPage/components/QCM/UpdateQcm"
import AddQuestion from "./EnseignantPage/components/QCM/AddQuestion"
import ViewQuestion from "./EnseignantPage/components/QCM/ViewQuestion"
import UpdateQuestion from "./EnseignantPage/components/QCM/UpdateQuestion"
import AddCoures from "./EnseignantPage/components/formation/AddCours"
import CoursListe from "./EnseignantPage/components/formation/ListeCours"
import ListeEtudiant from "./EnseignantPage/components/listeEtudiant/index"
import InscriptionEtudiant from "./EnseignantPage/components/listeEtudiant/listeEudiant"
import EseignantCertificateIndex from "./EnseignantPage/components/certificate/Index"
import EtudiantCertificate from "./EnseignantPage/components/certificate/listeEudiant"

import EtudiantProfile from "./EtudiantPage/components/profil/Profile"
import FormationIndex from "./EtudiantPage/components/ListeDeFormation/Index"
import VotreCours from "./EtudiantPage/components/votreCours/Index"
import CertificateIndex from "./EtudiantPage/components/certificate/Index"
import Certife from "./EnseignantPage/components/certificate/Certife"
import ListeCoours from "./EtudiantPage/components/votreCours/ListeCoours"
import TestQcm from "./EtudiantPage/components/votreCours/TestQcm"
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
  const token =   localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        
         <Route exact path='/' element={<Home/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/courses' element={<CourseHome/>} />
          <Route exact path='/team' element={<Team/>} />
          <Route exact path='/journal' element={<Blog/>} />
          <Route exact path='/contact' element={<Contact/>} />
          <Route exact path='/Login' element={<Login/>} />
          <Route exact path='/Registre' element={<SigneUp/>} />
  

          <Route element={<AdminPrivateRoutes/>}>
              <Route path="/admin" element={<AdminHome />} >
                <Route path="/admin" element={<AdminDashboard />} /> 
                <Route path="/admin/profile" element={<AdminProfile />} /> 
                <Route path="/admin/etudiant_list" element={<EtudiantIndex />} />               
                <Route path="/admin/enseignant_list" element={<EnseignantIndex />} />               
                <Route path="/admin/add_user" element={<AddUser/>} />               
                <Route path="/admin/update_user/:id" element={<ModifierUtilisateur/>} />               

              </Route>

          </Route>

          <Route element={<EnseignantPrivateRoutes/>}>
              <Route path="/enseignant" element={< EnseignantHome/>} >
                <Route path="/enseignant/dashboard" element={< Dashboard/>} />
                <Route path="/enseignant/profile" element={< EnseignantProfile/>} />
                <Route path="/enseignant/add_qcm" element={< AddQcm/>} />
                <Route path="/enseignant/update_Qcm/:id" element={< UpdateQcm/>} />
                <Route path="/enseignant/Add_Qestion/:QcmId" element={< AddQuestion/>} />
                <Route path="/enseignant/Etudiant_liste" element={< ListeEtudiant/>} />
                <Route path="/enseignant/listeEtudiant/:formationId" element={< InscriptionEtudiant/>} />

                <Route path="/enseignant/liste_qcm" element={< Qcm/>} />
                <Route path="/enseignant/Add_formation" element={< AddFormation/>} />
                <Route path="/enseignant/liste_formation" element={< Formation/>} />
                <Route path="/enseignant/view_Qestion/:id" element={< ViewQuestion/>} />
                <Route path="/enseignant/Update_Qestion/:QuestionId/:qcmId" element={< UpdateQuestion/>} />

                <Route path="/enseignant/Add_Cours/:FormationId" element={< AddCoures/>} />
                <Route path="/enseignant/Cours_liste" element={< CoursListe/>} />

                <Route path="/enseignant/Certificate_liste" element={< EseignantCertificateIndex/>} />
                <Route path="/enseignant/certife_listeEtudiant/:formationId/:formationName" element={< EtudiantCertificate/>} />
                <Route path="/enseignant/cetificat/:id/:prenom/:nom/:formation" element={< Certife/>} />

                
              </Route>

          </Route>

          <Route element={<EtudiantPrivateRoutes/>}>
              <Route path="/eleve" element={< EtudiantHome/>} >
              <Route path="/eleve/profile" element={< EtudiantProfile/>} />
              <Route path="/eleve/liste_formation" element={< FormationIndex/>} />
              <Route path="/eleve/liste_certificate" element={< CertificateIndex/>} />
              <Route path="/eleve/votre_cours" element={< VotreCours/>} />
              <Route path="/eleve/listeCours/:id" element={< ListeCoours/>} />
              <Route path="/eleve/test_qcm/:id" element={< TestQcm/>} />


              </Route>

          </Route>
         
          
           </>
    )
)
  return (
    <>
         
         
        <RouterProvider router ={router} />

    </>
  )
}

export default App
