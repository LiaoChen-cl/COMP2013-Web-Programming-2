// backend/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true } // Cuz the data with $
});

// Create the Product model
// I name the model 'products' and specify collection as 'products' to match MongoDB collection
// Cuz my mongodb both products, cuz sometimes similar name like last time the user one
// it go to wrong one, so I add the name
const products = mongoose.model("products", productSchema, "products");
module.exports = products;

