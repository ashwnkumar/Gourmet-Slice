import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios

const OrderFood = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setFoodItems(res.data); // Assuming the API returns an array of products
      } catch (err) {
        console.error("Error fetching food items:", err);
      }
    };

    fetchFoodItems();
  }, []);

  const handleOrder = (item) => {
    alert(`You have ordered: ${item.name}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Food Order Page</h2>
      <div className="row">
        {foodItems.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card">
              <img src={item.image} alt={item.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">
                  <strong>${item.price.toFixed(2)}</strong>
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOrder(item)}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderFood;
