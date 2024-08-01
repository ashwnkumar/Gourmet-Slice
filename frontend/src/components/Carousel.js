import React from "react";
import heroImage1 from "../images/carousel/hero1.jpg";
import heroImage2 from "../images/carousel/hero2.jpg";
import heroImage3 from "../images/carousel/hero3.jpg";

const CarouselSection = () => {
  return (
    <section id="carousel" className="container mt-5">
      <h2 className="text-center mb-4">Featured Dishes</h2>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={heroImage1} className="d-block w-100" alt="Dish 1" />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img src={heroImage2} className="d-block w-100" alt="Dish 2" />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img src={heroImage3} className="d-block w-100" alt="Dish 3" />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default CarouselSection;
