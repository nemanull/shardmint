import React, { useEffect, useState } from "react";
import "./TwinklingStars.css";
import Main from './Main.jsx';

function TwinklingStars() {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    const sky = document.querySelector(".sky");

    // Function to create stars
    function createStar() {
      if (starCount < 120) { // Set the maximum number of stars here (e.g., 50)
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        sky.appendChild(star);
        setStarCount((prevCount) => prevCount + 1);
      }
    }

    // Create stars at regular intervals
    const interval = setInterval(createStar, 100);

    return () => {
      clearInterval(interval);
    };
  }, [starCount]);

  return (
    <div>
      <div className="sky">
        <Main />
        <div className="conteiner_img">
          <div class="my-element_1"></div>
          <div class="my-element_2"></div>
          <div class="my-element_3"></div>
          <div class="my-element_4"></div>
          <div class="my-element_5"></div>
        </div>
      </div>
    </div>
  );
}

export default TwinklingStars;
