import React, { useState, useEffect } from 'react';
import img1 from './img/1427909958.png';
import img2 from './img/1427909959.png';
import img3 from './img/1427909960.png';
import img4 from './img/1427909961.png';
import img5 from './img/323.png';
import './Background.css';

const Background = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = (count) => {
      return Array.from({ length: count }, () => ({
        id: Math.random().toString(36).substring(2, 9),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
      }));
    };

    setStars(generateStars(150));

    const interval = setInterval(() => {
      setStars(prevStars => {
        if (prevStars.length < 200) {
          return [...prevStars, ...generateStars(5)];
        }
        return prevStars;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="sky">
        <div className="stars-container">
          {stars.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                left: star.left,
                top: star.top,
                animationDuration: star.animationDuration,
                animationDelay: star.animationDelay
              }}
            />
          ))}
        </div>
      </div>

      <div className="background-images">
        <div className="bg-element bg-element-1" style={{ backgroundImage: `url(${img1})` }} />
        <div className="bg-element bg-element-2" style={{ backgroundImage: `url(${img2})` }} />
        <div className="bg-element bg-element-3" style={{ backgroundImage: `url(${img3})` }} />
        <div className="bg-element bg-element-4" style={{ backgroundImage: `url(${img4})` }} />
        <div className="bg-element bg-element-5" style={{ backgroundImage: `url(${img5})` }} />
      </div>
    </>
  );
};

export default Background; 