import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import NavigationBar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false); // Loading state

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 5.0;
  const totalPrice = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    if (!user || !user.token) {
      alert("You are not authorized. Please log in again.");
      return;
    }

    if (!address) {
      alert("Please enter your delivery address.");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      address,
      paymentMethod,
      total: totalPrice,
    };

    setLoading(true); // Set loading state
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.msg || "Failed to place order.");
      }

      // Successful order placement
      alert("Checkout successful!");
      navigate("/order-success", { state: { order: orderData } }); // Pass order details to success page
    } catch (error) {
      console.error("Checkout error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Checkout Your Delicious Meal</h2>
        <div className="mb-4">
          <h4>Delivery Address</h4>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            required
          />
        </div>

        <div className="mb-4">
          <h4>Payment Method</h4>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>

        <div className="text-center mt-4">
          <h4>Your Order Summary</h4>
          <div className="d-flex justify-content-center">
            <table className="table table-borderless w-auto">
              <tbody>
                <tr>
                  <td>Subtotal:</td>
                  <td>${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Delivery Fee:</td>
                  <td>${deliveryFee.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total:</strong>
                  </td>
                  <td>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className="btn btn-success mt-3"
            onClick={handleCheckout}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
