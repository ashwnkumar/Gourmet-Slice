import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Header from "./components/Header";
import CarouselSection from "./components/Carousel";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/About";
import ContactSection from "./components/Contact";

function App() {
  return (
    <div className="App">
      <Header />
      <CarouselSection />
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}

export default App;
