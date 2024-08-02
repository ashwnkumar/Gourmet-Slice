import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useCart } from "../context/cartContext";

const NavigationBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item me-4">
            {" "}
            {/* Increased margin here */}
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item me-4">
            {" "}
            {/* Increased margin here */}
            <a className="nav-link" href="#about">
              About
            </a>
          </li>
          <li className="nav-item me-4">
            {" "}
            {/* Increased margin here */}
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </li>
          {isLoggedIn && ( // Show My Orders link only if logged in
            <li className="nav-item me-4">
              {" "}
              {/* Increased margin here */}
              <Link className="nav-link" to="/my-orders">
                My Orders
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              <li className="nav-item me-4">
                {" "}
                {/* Increased margin here */}
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
              <li className="nav-item me-4">
                {" "}
                {/* Increased margin here */}
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item me-4">
                {" "}
                {/* Increased margin here */}
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
  );
};

export default NavigationBar;
