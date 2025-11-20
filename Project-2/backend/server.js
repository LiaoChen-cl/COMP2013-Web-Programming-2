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
server.post("/add-product", async (req, res) => {
  try {
    const { productName, brand, image, price } = req.body;

    if (!productName || !brand || !image || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 生成前端列表用的伪造 ID（可以从 MongoDB _id 生成或者随机）
    const fakeId = Math.random().toString(36).substr(2, 9);

    const newProduct = new Product({ productName, brand, image, price, fakeId });
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: `${savedProduct.productName} added with MongoDB _id: ${savedProduct._id}`,
      product: savedProduct
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});






// Delete a product
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findOneAndDelete({ _id: id }); // ✅ 改为按 MongoDB ObjectId 删除
    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
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
