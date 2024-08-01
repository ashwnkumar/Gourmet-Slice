const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Admin = require("./models/Admin");
const Product = require("./models/Product");
const app = express();
const PORT = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const verifyToken = require("./authMiddleware");
<<<<<<< HEAD
const multer = require("multer");
const path = require("path");
=======
>>>>>>> origin/main

const uri = "mongodb+srv://admin:admin@cluster0.jvm5wud.mongodb.net/";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(bodyParser.json());
app.use(cors());

// Sign up to register the user
app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
<<<<<<< HEAD
      password,
=======
      password, // No hashing
>>>>>>> origin/main
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login route for user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Admin login route
app.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email is from the correct domain
  const domain = "@admins.gourmetslice.in";
  if (!email.endsWith(domain)) {
    return res
      .status(403)
      .json({ msg: `Access denied. Only ${domain} emails are allowed.` });
  }

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Compare the password (assuming it's hashed)
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

<<<<<<< HEAD
// Route for adding products
app.post("/api/products", async (req, res) => {
  console.log("Request body:", req.body); // Log the request body

  const { name, description, price, category } = req.body;

  // Basic validation
  if (!name || !description || !price || !category) {
    console.error("Validation error: All fields are required."); // Log validation error
    return res.status(400).json({ msg: "All fields are required." });
  }

  // Proceed with adding the product to the database...
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });

  try {
    await newProduct.save();
    res.status(201).json({ msg: "Product added successfully!" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ msg: "Error adding product", error: err.message });
  }
});
// Delete a product by ID
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found." });
    }

    res.status(200).json({ msg: "Product removed successfully!" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ msg: "Error removing product", error: error });
=======
// Add a new product
app.post("/api/products", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log received data
    const { name, description, price, image } = req.body;

    // Basic validation
    if (!name || !description || !price || !image) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    res.status(201).json({ msg: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error); // Log the entire error
    res.status(500).json({ msg: "Error adding product", error: error }); // Return the error object
>>>>>>> origin/main
  }
});

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
<<<<<<< HEAD
    console.error("Error fetching products:", error.message);
=======
    console.error("Error fetching products:", error.message); // Log error message
>>>>>>> origin/main
    res
      .status(500)
      .json({ msg: "Error fetching products", error: error.message });
  }
});

// Protected route
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ msg: "This is a protected route", user: req.user });
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
