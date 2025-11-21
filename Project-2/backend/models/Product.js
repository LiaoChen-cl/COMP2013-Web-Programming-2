// backend/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true } // "$2.75" 格式
});

// Create the Product model
const products = mongoose.model("products", productSchema, "products");
module.exports = products;

