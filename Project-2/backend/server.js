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

server.post("/products", async (req, res) => {
  try {
    const { productName, brand, image, price } = req.body;

    // 生成随机 id（例如 13 位数字）
    const randomId = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();

    const newProduct = new Product({
      id: randomId,
      productName,
      brand,
      image: image || "",
      price: price.startsWith("$") ? price : "$" + price
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ product: savedProduct });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ message: err.message });
  }
});











server.delete("/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Update a product
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  let { productName, brand, quantity, image, price } = request.body;

  if (typeof price === "string") {
    price = parseFloat(price.replace("$", ""));
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productName, brand, quantity, image, price },
      { new: true }
    );
    response.status(200).json({
      message: `Product updated successfully with id ${id}`,
      product: updatedProduct
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});