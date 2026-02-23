import React from "react";
import "./Hero.css";
function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Track Your Expenses Effortlessly</h1>
        <p>Smart budgeting. Clear insights. Total control.</p>

        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">View Demo</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;