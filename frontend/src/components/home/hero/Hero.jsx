import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"
import { useNavigate} from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const login = ()=>{
   navigate('/Login');
  }
  const registre = ()=>{
   navigate('/Registre');
  }
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='BIENVENUE À E-LEARNING' title='Expertise en Éducation en Ligne' />
            <p>Découvrez une plateforme d'apprentissage en ligne immersive, offrant une expérience pédagogique enrichissante.</p>
          
          </div>
        </div>
      </section>
      <div className='button'>
              <button onClick={()=>{login()}} className='primary-btn'>
              Connexion <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button onClick={()=>{registre()}}>
              Inscription <i className='fa fa-long-arrow-alt-right'></i>
              </button>
      </div>
      <div className='margin1'></div>

    </>
  )
}

export default Hero
