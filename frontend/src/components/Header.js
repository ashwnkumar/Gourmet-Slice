import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from "../images/logo/logo.png";
import { useCart } from "../context/cartContext";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

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
          <nav className="navbar navbar-expand-lg navbar-dark w-100 navbar-custom">
            <div className="container d-flex justify-content-between">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <button className="btn btn-secondary" onClick={logout}>
                        Sign Out
                      </button>
                    </li>
                    <li className="nav-item">
                      <Link to="/cart" className="nav-link">
                        Cart ({totalItems})
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item login">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item sign-up">
                      <Link className="nav-link" to="/sign-up">
                        Sign up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/cart" className="nav-link">
                        Cart ({totalItems})
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
