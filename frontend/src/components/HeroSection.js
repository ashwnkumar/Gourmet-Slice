import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/order-food");
  };

  return (
    <section
      className="flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/backgrounds/hero-background.avif')",
        height: "60vh",
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Discover Amazing Recipes
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Your journey to culinary excellence starts here.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          onClick={handleClick}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
