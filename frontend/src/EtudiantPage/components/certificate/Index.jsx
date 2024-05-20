import React, { useCallback, useRef, useState, useEffect } from 'react';
import axios from "axios";

function Index() {
  const [viewCertificate, setViewCertificate] = useState([]);

  useEffect(() => {
    const fetchCertificate = async () => {
      const authUser = JSON.parse(localStorage.getItem('auth_USER'));
      try {
        const response = await axios.get(`/api/Etudiant_get_certificate/${authUser.id}`);
        if (response.data.status === 200) {
          setViewCertificate(response.data.certificate);
        }
      } catch (error) {
        console.error('Error fetching certificate:', error);
      }
    };

    fetchCertificate();
  }, []);

  const handleDownload = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div>
      <div className='content' style={{ position: 'absolute', top: '57%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
        <h6>Votre certificate</h6>
      </div>

      {viewCertificate.map((certif, index) => (
        <div key={index}>
          <div className='container' style={{ position: 'relative' }}>
            <img src={`http://localhost:8000/uploads/certifes/${certif.certificate}`} height={400} alt="Certificate" />
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button style={{ padding: '10px 20px', backgroundColor: 'rgb(21, 170, 150)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleDownload(`http://localhost:8000/uploads/certifes/${certif.certificate}`)}>
              Download Certificate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
