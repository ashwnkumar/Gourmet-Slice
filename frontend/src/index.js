import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { AuthProvider } from "./context/authContext";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/Admin";
import OrderFood from "./components/OrderFood";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/order-food" element={<OrderFood />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
