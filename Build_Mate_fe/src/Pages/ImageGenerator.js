import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.limewire.com/v1/generate', {
        prompt,
        aspect_ratio: '1:1',
        quality: 'MID',
        samples: 1,
        guidance_scale: 40,
      }, {
        headers: {
          'Authorization': `Bearer lmwr_sk_FdERURC4st_2VQHgxBxrSH33FxIgUAU6Jc9Y4ftYqzkVagEG`,
          'X-Api-Version': 'v1',
          'Accept': 'application/json',
        },
      });

      const { data } = response.data;
      if (data && data.length > 0) {
        setImageUrl(data[0].self);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter text prompt"
      />
      <button onClick={handleGenerateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {imageUrl && <img src={imageUrl} alt="Generated" style={{ marginTop: '20px', maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageGenerator;
