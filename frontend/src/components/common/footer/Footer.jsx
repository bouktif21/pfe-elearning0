import React from "react"
import { blog } from "../../../dummydata"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Newsletter - Restez informé et obtenez les dernières mises à jour</h1>
            <span>Loin, très loin, derrière les montagnes de mots</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Entrez votre adresse e-mail' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>E_LEARNING</h1>
            <span>ÉDUCATION ET APPRENTISSAGE EN LIGNE</span>
            <p>Une petite rivière nommée Duden passe par leur endroit et la fournit en regelialia nécessaires.</p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explorer</h3>
            <ul>
              <li>À propos de nous</li>
              <li>Services</li>
              <li>Cours</li>
              <li>Blog</li>
              <li>Contactez-nous</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Liens rapides</h3>
            <ul>
              <li>Contactez-nous</li>
              <li>Tarification</li>
              <li>Termes & Conditions</li>
              <li>Confidentialité</li>
              <li>Retours d'expérience</li>
            </ul>
          </div>
          <div className='box'>
            <h3>Articles récents</h3>
            {blog.slice(0, 3).map((val) => (
              <div className='items flexSB' key={val.id}>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
          <div className='box last'>
            <h3>Vous avez des questions ?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                SOUSSE, TUNISIE
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +216 90392584
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                info@LABIT.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2024 <i className='fa fa-heart'></i>
        </p>
      </div>
    </>
  )
}

export default Footer
