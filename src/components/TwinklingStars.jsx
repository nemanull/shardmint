import React, { useEffect } from 'react';
import './TwinklingStars.css';

const TwinklingStars = () => {
  useEffect(() => {
    const sky = document.createElement('div');
    sky.className = 'sky';
    document.querySelector('.App').prepend(sky);

    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    sky.appendChild(starsContainer);

    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      return star;
    };

    // Create initial stars
    for (let i = 0; i < 150; i++) {
      starsContainer.appendChild(createStar());
    }

    // Add new stars periodically
    const interval = setInterval(() => {
      if (starsContainer.children.length < 200) {
        starsContainer.appendChild(createStar());
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      sky.remove();
    };
  }, []);

  return null;
};

export default TwinklingStars;
