import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login with data:", formData);
    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      setMessage(res.data.msg);

      const token = res.data.token;
      console.log("Token received:", token);

      login(token);

      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log("Error response:", err.response);
        if (err.response.data.msg === "Invalid credentials") {
          setMessage(
            "Invalid credentials, please check your email and password."
          );
        } else {
          setMessage("Error: " + err.response.data.msg);
        }
      } else {
        setMessage("Error: Something went wrong");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
      <p className="mt-3">
        <Link to="/admin-login">Admin Sign In</Link>
      </p>
    </div>
  );
}

export default Login;
