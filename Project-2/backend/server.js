// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { DB_URI } = process.env;
// Import Product model, corresponds to our MongoDB collection
// Product defined ./models/Product.js
const Product = require("./models/Product"); 



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





// Test route
// quickly check if server is live
server.get("/", (request, response) => {
  response.send("Live");// Just a simple response to check
});

// Get all products
server.get("/products", async (request, response) => {
  try {
    // Fetch everything, add pagination later
    const products = await Product.find();
    response.json(products);
  } catch (error) {
    // help check break 500
    response.status(500).json({ message: error.message });
  }
});


// Add new product
server.post("/products", async (request, response) => {
  try {
    const { productName, brand, image, price } = request.body;

    // I decided to generate a random 13-digit id for each product
    // Actually, MongoDB has its own _id, but I see outher datas have 13-digit ids
    const randomId = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();

    const newProduct = new Product({
      id: randomId, // so I do the random id and for front-end matching
      productName,
      brand,
      image: image || "", // Default empty string if no image, no need null checks later
      price: price.startsWith("$") ? price : "$" + price // it have the $ need to deal with
    });

    const savedProduct = await newProduct.save();
    response.status(201).json({ product: savedProduct });
// I don't do extra validation here because frontend already checks required fields

  } catch (error) {
    console.error("Error saving product:", error);
    response.status(500).json({ message: error.message });
  }
});



// Delete a product by its MongoDB _id itself from db generate
server.delete("/products/:id", async (request, response) => {
  try {
    const deleted = await Product.findByIdAndDelete(request.params.id);
    if (!deleted) return response.status(404).json({ message: "Not found" });
    response.json({ message: "Deleted" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});




// Update a product by its MongoDB _id
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  let { productName, brand, image, price } = request.body;

  // Clean up price if it's a string with "$", make it easy to deal with
  if (typeof price === "string") price = parseFloat(price.replace("$", ""));

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productName, brand, image, price },
      { new: true } // Return the updated product, update imdiately
    );
    response.status(200).json({ product: updatedProduct }); 
    // Frontend replace old product with this updated one 
  } catch (error) {
    response.status(500).json({ message: error.message });  
  }
});
