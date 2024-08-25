import React, { useState } from 'react';
import axios from 'axios';
import women from '../Components/Assets/Home-women.png';
import './ImageGeneration.css';  // Import the CSS file
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/footer';
import aiImage from '../Components/Assets/image (5).png';

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/generate-image', { prompt });
      setImageUrl(response.data.imageUrl);
      setError('');
    } catch (err) {
      console.error('Error generating image:', err.message);
      setError('Error generating image. Please try again.');
    }
  };

  return (
    <div>

    <div className='generator'>
      <div className='navImage'>
        <Navbar/>
      </div>
      
      <div className='image-generator'>
        
        
      <div className="image-gen-wrapper">
        <img src={aiImage} alt='woman' className='ai-img' />
        <div className='image-gen-right'>
          <h1 className='image-head'>Transform Ideas into Stunning Visuals</h1>
          <h5>Generate, Customize, and Download Your Images in Seconds</h5>
          
            <form onSubmit={handleSubmit}>
              <div className='imageGenForm'>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter prompt"
                  className="prompt-input-field"
                />
                <button type="submit" className="generate-btn">Generate Image</button>
              </div>
            </form>
          
          
          {imageUrl && <img src={imageUrl} alt="Generated" className="generated-image" />}
          {error && <p className="error-message">{error}</p>}  
        </div>
        
      </div> 
    </div>
    
    </div>
    <Footer/>
    </div>
    
  );
};

export default ImageGeneration;
