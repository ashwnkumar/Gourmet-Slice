// src/components/OrderSuccess.js

import React from "react";
import NavigationBar from "./Navbar"; // Ensure the correct path to the NavigationBar component
import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const { order } = location.state || {}; // Retrieve order details from location state

  return (
    <>
      <NavigationBar />
      <div className="container mt-5 text-center">
        <h2 className="mb-4">Order Placed Successfully!</h2>
        <p>Thank you for your order! Your delicious meal is on its way.</p>

        {order && (
          <div className="order-summary mt-4">
            <h4>Your Order Summary</h4>
            <ul className="list-group">
              {order.items.map((item, index) => (
                <li className="list-group-item" key={index}>
                  {item.product.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-3">Total Amount: ${order.total}</p>
            <p>Delivery Address: {order.address}</p>
            <p>Payment Method: {order.paymentMethod}</p>
          </div>
        )}

        <button
          className="btn btn-primary mt-4"
          onClick={() => (window.location.href = "/")} // Redirect to home page
        >
          Go to Home
        </button>
      </div>
    </>
  );
};

export default OrderSuccess;
