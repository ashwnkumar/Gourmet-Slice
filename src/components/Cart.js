import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import NavigationBar from "./Navbar";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const { isLoggedIn } = useAuth();
  const { cart, removeFromCart, reduceQuantity, increaseQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 5.0;
  const totalPrice = subtotal + deliveryFee;

  if (!isLoggedIn) {
    return (
      <>
        <NavigationBar />
        <div className="bg-gradient-to-r from-blue-50 to-white min-h-screen py-10">
          <div className="container mx-auto mt-5">
            <h2 className="text-center mb-4 text-4xl font-bold text-gray-800">
              Your Cart
            </h2>
            <div className="alert alert-warning text-center" role="alert">
              You are not logged in. Please log in first.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="bg-gradient-to-r from-blue-50 to-white min-h-screen py-10">
        <div className="container mx-auto mt-5">
          <h2 className="text-center mb-4 text-4xl font-bold text-gray-800">
            <FaShoppingCart className="inline-block mr-2 text-blue-600" />
            Your Cart
          </h2>
          {cart.length > 0 ? (
            <>
              {/* Cart Details Section */}
              <div className="table-responsive mb-8">
                <table className="table table-hover w-full border border-gray-300 rounded-lg shadow-md">
                  <thead className="bg-gray-200">
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
                          <div className="flex items-center">
                            <button
                              className="bg-gray-200 rounded-full p-2 mr-2 hover:bg-gray-300 transition duration-200"
                              onClick={() => reduceQuantity(item._id)}
                            >
                              <FaMinus className="text-gray-600" />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="bg-gray-200 rounded-full p-2 ms-2 hover:bg-gray-300 transition duration-200"
                              onClick={() => increaseQuantity(item._id)}
                            >
                              <FaPlus className="text-gray-600" />
                            </button>
                          </div>
                        </td>
                        <td>
                          <button
                            className="bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 py-1 px-1 text-md"
                            onClick={() => removeFromCart(item._id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Summary Section */}
              <div className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white mb-8">
                <h4 className="text-2xl font-bold text-center mb-4">
                  Order Summary
                </h4>
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="font-semibold">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="font-semibold">Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="text-center mt-4">
                  <button
                    className="bg-blue-600 text-white rounded-md mt-4 py-2 px-6 hover:bg-blue-700 transition duration-200"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-lg text-gray-600">
              Your cart is empty.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
