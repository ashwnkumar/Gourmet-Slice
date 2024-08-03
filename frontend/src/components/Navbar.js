import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useCart } from "../context/cartContext";

const NavigationBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-red-600 shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-white text-3xl font-bold transition-transform transform hover:scale-105">
          <Link to="/">Gourmet Slice</Link>
        </div>
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link
              className="text-white hover:text-yellow-300 transition duration-200 hover:scale-105"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <a
              className="text-white hover:text-yellow-300 transition duration-200 hover:scale-105"
              href="#about"
            >
              About
            </a>
          </li>
          <li>
            <a
              className="text-white hover:text-yellow-300 transition duration-200 hover:scale-105"
              href="#contact"
            >
              Contact
            </a>
          </li>
          {isLoggedIn && (
            <li>
              <Link
                className="text-white hover:text-yellow-300 transition duration-200 hover:scale-105"
                to="/my-orders"
              >
                My Orders
              </Link>
            </li>
          )}
        </ul>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-200 transform hover:scale-105 shadow-lg"
                onClick={logout}
              >
                Sign Out
              </button>
              <Link
                to="/cart"
                className="text-white hover:text-yellow-300 transition duration-200 hover:scale-105"
              >
                Cart ({totalItems})
              </Link>
            </>
          ) : (
            <>
              <Link
                className="text-white hover:text-yellow-300 transition duration-200 hover:scale-105"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="text-white hover:text-yellow-300 transition duration-200 hover:scale-105"
                to="/sign-up"
              >
                Sign Up
              </Link>
              <Link
                to="/cart"
                className="text-white hover:text-yellow-300 transition duration-200 hover:scale-105"
              >
                Cart ({totalItems})
              </Link>
            </>
          )}
        </div>
        {/* Responsive Hamburger Menu (optional, needs implementation) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
