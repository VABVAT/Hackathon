import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing_page.css';
import img1 from '/img1.png'
import img2 from '/img2.png'
import img3 from '/img3.png'
import img4 from '/img4.png'
import police from '/goa_image.png'

function App() {
  const navigate = useNavigate();

  const goToForm = () => {
    navigate('/PCCForm');
  };

  const goToStatus = () => {
    navigate('/PCCStatus');
  };

  const adminLogin = () => {
    navigate('/Admin');
  };

  const report = () => {
    navigate('/report');
  };

  useEffect(() => {
    const startSlider = (sliderId) => {
      const slider = document.getElementById(sliderId);
      const images = slider.getElementsByTagName('img');
      let currentIndex = 0;

      const slideImages = () => {
        currentIndex++;
        if (currentIndex >= images.length) {
          currentIndex = 0; // Reset to first image
        }
        const offset = -currentIndex * 500; // Adjust based on image height
        slider.style.transform = `translateY(${offset}px)`; // Move the slider
      };

      // Change the image every 2 seconds (2000 ms)
      setInterval(slideImages, 2000);
    };

    // Start sliders for both sections
    startSlider('slider1');
    startSlider('slider2');
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <div className="logo">
            <img src={police} alt="Police Logo" />
          </div>
          <div className="center-text">
            <h1>GOA POLICE</h1>
          </div>
          <div className="menu">
            <button id="homeButton">Home</button>
            <button id="aboutButton">About Us</button>
            <button id="featuresButton">Features</button>
            <button id="contactUs">Contact Us</button>
          </div>
        </div>
      </header>

      <div className="below">
        <div className="left">
          <h2>Welcome to AI Police ChatBot</h2>
          <h3 className='random_text'>
            Based on their case descriptions, the AI assistant chatbot is
            intended to aid guests at police stations by advising them on the
            kind of case they should register. It categorizes the case type
            using advanced text analysis and then gives detailed guidance on
            what has to be performed next. Legal proceedings are handled more
            easily and effectively as a result of this process streamlining for
            both officers and visitors.
          </h3>
          <div className="buttonContainer">
            <button className='b1' onClick={goToForm}>Start New Application</button>
            <button className='b1' onClick={goToStatus}>Review your status</button>
            <button className='b1' onClick={adminLogin}>Admin login</button>
            <button className='b1' onClick={report}>Report a crime (with AI chat bot)</button>
          </div>
        </div>

        <div className="right">
          <div className="right1">
            <div className="slider-container">
              <div className="slider" id="slider1">
                <img src={img1} alt="Image 1" />
                <img src={img3} alt="Image 3" />
                <img src={img4} alt="Image 4" />
              </div>
            </div>
          </div>

          <div className="right2">
            <div className="slider-container">
              <div className="slider" id="slider2">
                <img src={img4} alt="Image 2" />
                <img src={img3} alt="Image 1" />
                <img src={img1} alt="Image 4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-container">
          <div className="footer-about">
            <h3>About Goa Police</h3>
            <p>
              The Goa Police is committed to ensuring safety and security in the
              state, utilizing modern technology and community engagement to
              maintain law and order. With a focus on serving the public, the
              Goa Police aims to protect citizens and enhance their quality of
              life.
            </p>
          </div>
          <div className="footer-features">
            <h3>Features</h3>
            <ul>
              <li>AI-Driven Case Detection</li>
              <li>Multilingual Speech-to-Text Translation</li>
              <li>Legal Guidance</li>
              <li>Database for Victim Information</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contact Goa Police</h3>
            <p>If you need assistance, please reach out to us:</p>
            <p>
              <strong>Phone:</strong> 100 (Emergency)
            </p>
            <p>
              <strong>Email:</strong> info@goapolice.gov.in
            </p>
            <p>
              <strong>Address:</strong> Police Headquarters, Panaji, Goa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
