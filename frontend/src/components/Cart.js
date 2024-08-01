import React from "react";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const { cart, removeFromCart, reduceQuantity, increaseQuantity } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <>
          <div className="row">
            {cart.map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card shadow border-light">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">
                      <strong>${item.price.toFixed(2)}</strong>
                    </p>
                    <p className="card-text">
                      Quantity: <strong>{item.quantity}</strong>
                    </p>
                    <div className="d-flex align-items-center mb-3">
                      <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => reduceQuantity(item._id)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => increaseQuantity(item._id)} // Increase quantity button
                      >
                        +
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
          </div>
        </>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
