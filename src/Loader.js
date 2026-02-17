import React, { useState, useEffect } from 'react';
import './Loader.css';

function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(progressInterval);
        // Hold for a moment then fade out
        setTimeout(() => {
          onComplete();
        }, 300);
      } else {
        setProgress(currentProgress);
      }
    }, interval);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="loader-container">
      <div className="loader-progress-container">
        <div 
          className="loader-progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default Loader;
