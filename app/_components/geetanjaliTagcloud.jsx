import React, { useEffect } from 'react';
import TagCloud from 'TagCloud';

const GeetanjaliTagCloud = () => {
  useEffect(() => {
    const container = '.tagcloud';
    const texts = [
      'Geetanjali Diagnostics', 'Health', 'Wellness', 
      'Pathology', 'Radiology', 'Advanced Imaging', 
      '3D Scans', 'MRI', 'CT Scan', 
      'Ultrasound', 'Blood Tests', 'Diagnostics',
    ];
    const options = {
      radius: 300, // Increase the radius for a larger cloud
      maxSpeed: 'slow', // Slow down the rotation for better readability
      initSpeed: 'slow',
      direction: 135,
      keep: true, // Keep the cloud spinning
      useContainerInlineStyles: false,
      fontSize: 100, // Set a larger font size
      fontWeight: 'bold', // Make the text bold
    };

    TagCloud(container, texts, options);
  }, []);

  return (
    <div 
      className="tagcloud" 
      style={{ 
        height: '100%', 
        margin: '0 auto', 
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif', // Set a readable font
        color: 'white', // Set the text color
        position:'relative'
      }}
    ></div>
  );
};

export default GeetanjaliTagCloud;
