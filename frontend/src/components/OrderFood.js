import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext"; // Ensure the correct path to the useAuth file
import NavigationBar from "./Navbar"; // Ensure the correct path to the NavigationBar component

const OrderFood = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState({});

  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setFoodItems(res.data);
        const initialQuantities = {};
        res.data.forEach((item) => {
          initialQuantities[item._id] = 0;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error("Error fetching food items:", err);
      }
    };

    fetchFoodItems();
  }, []);

  const handleOrder = (item) => {
    const quantity = quantities[item._id];
    if (!isLoggedIn) {
      alert("You are not logged in. Please log in first.");
      return;
    }
    if (quantity > 0) {
      addToCart(item, quantity);
      setQuantities({ ...quantities, [item._id]: 0 });
    } else {
      alert(`Please select a quantity for ${item.name}`);
    }
  };

  const filteredItems = foodItems.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const increaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));
  };

  const decreaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(0, prevQuantities[itemId] - 1);
      return { ...prevQuantities, [itemId]: newQuantity };
    });
  };

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Food Order Page</h2>
        <div className="mb-4 text-center">
          <label className="me-2">Filter by category:</label>
          <select
            className="form-select w-25 d-inline"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        <div className="row">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
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
                    <div className="d-flex align-items-center mb-3">
                      <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        -
                      </button>
                      <span className="mx-2">{quantities[item._id]}</span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => increaseQuantity(item._id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={() => handleOrder(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">
              No food items available for this category.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderFood;
