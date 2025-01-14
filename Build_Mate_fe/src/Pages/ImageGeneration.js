import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ImageGeneration.css'; // Import the CSS file
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/footer';
import aiImage from '../Components/Assets/image (5).png';
import Swal from 'sweetalert2';
import Subscribe from '../Components/Subscribe/Sub';

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post('http://localhost:8000/generate-image', { prompt });
      setImageUrl(response.data.imageUrl);
      setError('');
    } catch (err) {
      console.error('Error generating image:', err.message);
      setError('Error generating image. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token !== '1234') {
      Swal.fire({
        icon: 'warning',
        title: 'Access denied',
        footer: "You have to log in first",
        confirmButtonText: 'OK'
      });
      navigate('/Pages/home');
    }
  }, [navigate]);

  const textAreaRef = useRef(null);

  // Adjust height of textarea as user types
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height before calculating new height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set height to content height
    }
  }, [prompt]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='generator'>
        <Subscribe/>
        <div className='navImage'>
          <Navbar />
        </div>

        <div className='image-generator'>
          {imageUrl ? (
            <div className="image-display-wrapper">
              <img src={imageUrl} alt="Generated" className="generated-image" />
              <button className="download-btn" onClick={handleDownload}>Download Image</button>
            </div>
          ) : (
            <div className="image-gen-wrapper">
              <img src={aiImage} alt='AI' className='ai-img' />
              <div className='image-gen-right'>
                <h1 className='image-head'>Transform Ideas into Stunning Visuals</h1>
                <h5>Generate, Customize, and Download Your Images in Seconds</h5>

                <form onSubmit={handleSubmit}>
                  <div className='imageGenForm'>
                  <textarea
                    ref={textAreaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}  // Updates `prompt` state as user types
                    placeholder="Enter prompt"
                    className="prompt-input-field"
                    style={{ resize: "none", overflow: "hidden" }} // Disables resizing and hides overflow
                  />
                    <button type="submit" className="generate-btn">Generate Image</button>
                  </div>
                </form>

                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ImageGeneration;
