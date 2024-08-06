import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useCart } from "./cartContext";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { resetCart } = useCart();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token on load:", decodedToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
          setUser({
            token,
            email: decodedToken.email,
            name: decodedToken.name,
            image: decodedToken.image || null, // Use 'image'
          });
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token on login:", decodedToken);
    setIsLoggedIn(true);
    setUser({
      token,
      email: decodedToken.email,
      name: decodedToken.name,
      id: decodedToken.id, // Use 'id' instead of '_id'
      profileImage: decodedToken.profileImage || null,
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    resetCart();
    setUser(null);
    navigate("/");
  };

  const updateUser = (updatedUser) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
