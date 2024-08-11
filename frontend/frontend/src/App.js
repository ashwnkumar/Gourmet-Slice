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
    <div className="App bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <CarouselSection />
        <HeroSection />
        <AboutSection />
        <ContactSection />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 Gourmet Slice. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
