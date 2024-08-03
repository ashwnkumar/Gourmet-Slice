import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaProductHunt,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

const Admin = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Veg",
  });
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [orders, setOrders] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
    } else {
      fetchProducts();
      fetchUsersAndOrders();
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

  const fetchUsersAndOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const usersResponse = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const ordersResponse = await axios.get(
        "http://localhost:5000/api/orders/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(usersResponse.data);
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Error fetching users or orders:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        category: "Veg",
      });
      fetchProducts();
    } catch (err) {
      setMessage("Error adding product: " + err.response.data.msg);
    }
  };

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

  const toggleUserOrders = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
        <FaUserShield className="mr-2" /> Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white shadow-md rounded-md"
        >
          <h3 className="text-2xl font-bold mb-4">Add Product</h3>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              autoComplete="off"
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 flex items-center justify-center"
          >
            <FaProductHunt className="mr-2" /> Add Product
          </button>
          {message && (
            <p className="bg-yellow-100 text-yellow-700 p-4 rounded-md mt-4">
              {message}
            </p>
          )}
        </form>

        <div className="bg-white shadow-md rounded-md p-4">
          <h3 className="text-2xl font-bold mb-4">Product List</h3>
          {products.length > 0 ? (
            <ul className="space-y-4">
              {products.map((product) => (
                <li
                  key={product._id}
                  className="p-4 bg-gray-100 rounded-md flex justify-between items-center"
                >
                  <div>
                    <h5 className="text-lg font-bold">{product.name}</h5>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                  </div>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md shadow-sm hover:bg-red-700"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-center mb-4">
        User List and Their Orders
      </h3>
      {loadingUsers ? (
        <p className="text-center">Loading users...</p>
      ) : (
        users.map((user) => (
          <div key={user._id} className="mb-6">
            <div className="bg-white shadow-md rounded-md">
              <div
                className={`p-4 flex justify-between items-center cursor-pointer transition duration-300 ease-in-out ${
                  expandedUser === user._id ? "bg-green-200" : ""
                } hover:bg-green-100`}
                onClick={() => toggleUserOrders(user._id)}
              >
                <h5 className="text-lg font-bold flex items-center">
                  <FaUser className="mr-2" /> {user.email}
                </h5>
                <span>{expandedUser === user._id ? "▲" : "▼"}</span>
              </div>
              {expandedUser === user._id && (
                <div className="p-4 border-t">
                  <h6 className="font-bold">Orders:</h6>
                  {orders
                    .filter((order) => order.user._id === user._id)
                    .map((order) => (
                      <div key={order._id} className="border p-2 mb-2">
                        <p>Order ID: {order._id}</p>
                        <p>Status: {order.status}</p>
                        <p>Total: ${order.total.toFixed(2)}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center justify-center"
      >
        <FaSignOutAlt className="mr-2" /> Sign Out
      </button>
    </div>
  );
};

export default Admin;
