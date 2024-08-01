import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/order-food");
  };
  return (
    <section
      className="hero text-white text-center d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/images/backgrounds/hero-background.avif')",
        height: "60vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <h2>Discover Amazing Recipes</h2>
        <p>Your journey to culinary excellence starts here.</p>
        <button className="btn btn-primary" onClick={handleClick}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
