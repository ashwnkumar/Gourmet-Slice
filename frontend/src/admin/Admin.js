import React, { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
=======
import { AuthContext } from "../context/authContext"; // Ensure the path is correct
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios to make HTTP requests

function AdminDashboard() {
>>>>>>> origin/main
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
<<<<<<< HEAD
    category: "Veg",
  });
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
=======
    image: "",
  });
  const [message, setMessage] = useState("");
>>>>>>> origin/main

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
<<<<<<< HEAD
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

=======
    }
  }, [navigate]);

>>>>>>> origin/main
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChange = (e) => {
<<<<<<< HEAD
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
=======
    setFormData({ ...formData, [e.target.name]: e.target.value });
>>>>>>> origin/main
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

=======
>>>>>>> origin/main
    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData
      );
      setMessage(res.data.msg);
      setFormData({
        name: "",
        description: "",
        price: "",
<<<<<<< HEAD
        category: "Veg",
      });
      fetchProducts();
=======
        image: "",
      }); // Clear the form
>>>>>>> origin/main
    } catch (err) {
      setMessage("Error adding product: " + err.response.data.msg);
    }
  };

<<<<<<< HEAD
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setMessage("Product deleted successfully!");
        fetchProducts();
      } catch (err) {
        setMessage("Error deleting product: " + err.response.data.msg);
      }
    }
  };

=======
>>>>>>> origin/main
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
<<<<<<< HEAD
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Beverage">Beverage</option>
          </select>
=======
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
>>>>>>> origin/main
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
      {message && <p>{message}</p>}
<<<<<<< HEAD

      {/* Display list of products */}
      <h3 className="text-center">Product List</h3>
      {products.length > 0 ? (
        <ul className="list-group mb-4">
          {products.map((product) => (
            <li
              key={product._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}

=======
>>>>>>> origin/main
      <button className="btn btn-danger" onClick={handleLogout}>
        Sign Out
      </button>
      <Link to="/order-food">Product Page</Link>
    </div>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> origin/main

export default AdminDashboard;
