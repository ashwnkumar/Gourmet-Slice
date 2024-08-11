import React from "react";
import logo from "../images/logo/logo.png";
import NavigationBar from "./Navbar";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-4">
          <img className="h-12 w-auto" src={logo} alt="logo" />
          <h1 className="text-4xl font-extrabold tracking-tight">
            Gourmet Slice
          </h1>
        </div>
        <NavigationBar />
      </div>
    </header>
  );
};

export default Header;
