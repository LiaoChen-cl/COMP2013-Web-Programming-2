const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Product schema
const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0 // Products cannot be less than 0
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Price cannot be negative
  }
});

// Create the Product model
const products = mongoose.model("products", productSchema, "products");

module.exports = products;
