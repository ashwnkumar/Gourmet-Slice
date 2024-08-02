import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext"; // Ensure the correct path to the useAuth file
import NavigationBar from "./Navbar";

const Cart = () => {
  const { isLoggedIn, logout } = useAuth(); // Use AuthContext to check if user is logged in
  const { cart, removeFromCart, reduceQuantity, increaseQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 5.0;
  const totalPrice = subtotal + deliveryFee;

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to home page after logging out
  };

  if (!isLoggedIn) {
    return (
      <>
        <NavigationBar />
        <div className="container mt-5">
          <h2 className="text-center mb-4">Your Cart</h2>
          <div className="alert alert-warning text-center" role="alert">
            You are not logged in. Please log in first.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Your Cart</h2>
        {cart.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id} className="align-middle">
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ width: "100px", height: "auto" }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-secondary me-2"
                            onClick={() => reduceQuantity(item._id)}
                            aria-label="Reduce quantity"
                            title="Reduce quantity"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary ms-2"
                            onClick={() => increaseQuantity(item._id)}
                            aria-label="Increase quantity"
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => removeFromCart(item._id)}
                          aria-label="Remove item"
                          title="Remove item"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4">
              <h4>Order Summary</h4>
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
                className="btn btn-primary mt-4"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
    </>
  );
};

export default Cart;
