// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { DB_URI } = process.env;
const Product = require("./models/Product"); // 对应 Product 模型

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error.message);
  });

// Routes

// Test route
server.get("/", (request, response) => {
  response.send("Live");
});

// Get all products
server.get("/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Add a new product
server.post("/add-product", async (request, response) => {
  const { id, productName, brand, quantity, image, price } = request.body;
  const newProduct = new Product({ id, productName, brand, quantity, image, price });
  try {
    await newProduct.save();
    response.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Delete a product
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  const objectId = new mongoose.Types.ObjectId(id); // 如果 id 是 MongoDB ObjectId
  try {
    await Product.findByIdAndDelete(objectId);
    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Update a product
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const { productName, brand, quantity, image, price } = request.body;
  const objectId = new mongoose.Types.ObjectId(id); // 如果 id 是 ObjectId
  try {
    await Product.findByIdAndUpdate(objectId, { productName, brand, quantity, image, price });
    response.status(200).json({ message: `Product updated successfully with id ${id}` });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});
