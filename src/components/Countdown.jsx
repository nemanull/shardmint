import React, { useEffect, useState } from 'react';
import './Countdown.css';

const Countdown = () => {
  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const targetDate = new Date(new Date().getFullYear(), 10, 15).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    const weeksRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 7));
    const daysRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    setWeeks(weeksRemaining);
    setDays(daysRemaining);
    setHours(hoursRemaining);
    setMinutes(minutesRemaining);
    setSeconds(secondsRemaining);
  }

  useEffect(() => {
    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-item">
        <span className="countdown-value">{weeks}</span>
        <span className="countdown-label">Weeks</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{hours}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{minutes}</span>
        <span className="countdown-label">Minutes</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{seconds}</span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );
};

export default Countdown; 