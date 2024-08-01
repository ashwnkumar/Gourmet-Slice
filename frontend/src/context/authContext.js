import React, { createContext, useState, useEffect } from "react";
<<<<<<< HEAD
import { jwtDecode } from "jwt-decode";
=======
import { jwtDecode } from "jwt-decode"; // Ensure the correct import
>>>>>>> origin/main

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.log("Error decoding token:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    console.log("Is user logged in?", isLoggedIn);
  }, [isLoggedIn]);

  const login = (token) => {
    localStorage.setItem("token", token);
    console.log("Token after sign-in:", localStorage.getItem("token"));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    console.log("User signed out.");
<<<<<<< HEAD
    console.log("Token after sign-out:", localStorage.getItem("token"));
=======
    console.log("Token after sign-out:", localStorage.getItem("token")); // Should be null
>>>>>>> origin/main
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
