import React from "react";
import "./Hero.css";
import {useNavigate} from 'react-router-dom'
function Hero() {

  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Track Your Expenses Effortlessly</h1>
        <p>Smart budgeting. Clear insights. Total control.</p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate('/dashboard')}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;