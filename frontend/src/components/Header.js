// Header.js
import React from "react";
import logo from "../images/logo/logo.png";
import NavigationBar from "./Navbar";

const Header = () => {
  return (
    <header className="App-header bg-dark text-white p-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-auto">
            <img className="logo-img" src={logo} alt="logo" />
          </div>
          <div className="col text-center">
            <h1>Welcome to Foodie's Paradise</h1>
          </div>
        </div>
        <div className="row">
          <NavigationBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
