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
import { CartProvider } from "./context/cartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import MyOrders from "./components/MyOrders";
import AdminSignUp from "./admin/AdminSignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-sign-up" element={<AdminSignUp />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/order-food" element={<OrderFood />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </AuthProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>
);
