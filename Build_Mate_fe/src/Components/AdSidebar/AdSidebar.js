import React, { useEffect, useState } from 'react';

import ad1 from '../Assets/ad1.png';
import ad2 from '../Assets/ad2.png';
import ad3 from '../Assets/ad3.png';

import './AdSidebar.css'; // Styling for the AdSidebar component

const AdSidebar = () => {
  const [visible, setVisible] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Array of mock ads with their relative paths
  const mockAds = [
    { id: 1, src: ad1, alt: 'Ad 1' },
    { id: 2, src: ad2, alt: 'Ad 2' },
    { id: 3, src: ad3, alt: 'Ad 3' },
  ];

  useEffect(() => {
    // Show the sidebar after 10 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10000);

    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  useEffect(() => {
    if (visible) {
      // Rotate ads every 10 seconds
      const adRotation = setInterval(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % mockAds.length);
      }, 10000);

      return () => clearInterval(adRotation); // Clean up interval on unmount or visibility change
    }
  }, [visible, mockAds.length]);

  const handleHideSidebar = () => {
    setVisible(false);
  };

  return (
    visible && (
      <div className="ad-sidebar">
        <button className="hide-button" onClick={handleHideSidebar}>
          Hide adds
        </button>
        <div className="ad-container">
          <img
            src={mockAds[currentAdIndex].src}
            alt={mockAds[currentAdIndex].alt}
            className="mock-ad"
          />
        </div>
      </div>
    )
  );
};

export default AdSidebar;
