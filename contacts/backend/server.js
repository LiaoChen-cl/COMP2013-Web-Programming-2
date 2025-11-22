// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const { request, response } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { DB_URI } = process.env;
const Contact = require("./models/contact");

//Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors()); // Enable CORS for all requests to the server (Cross-Origin Resource Sharing) - This is needed to allow the frontend to make requests to the backend server

// Connect to the database
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
server.get("/", (request, response) => {
  response.send("Live");
});

server.get("/contacts", async (request, response) => {
  try {
    const contacts = await Contact.find();
    response.send(contacts);
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


server.delete("/contacts/:id", async (request, response) => {
  const { id } = request.params;
  const objectId = new mongoose.Types.ObjectId(id); // Convert id to Mongoose ObjectId
  try {
    await Contact.findByIdAndDelete(objectId);
    response.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

server.patch("/contacts/:id", async (request, response) => {
  const { id } = request.params;
  const { name, email, address, phone, image } = request.body;
  const objectId = new mongoose.Types.ObjectId(id); // Convert id to Mongoose ObjectId
  try {
    await Contact.findByIdAndUpdate(id, {
      name,
      contact: { email, phone, address },
      image,
    }).then((response) => {
      console.log(response);
    });

    await response
      .status(200)
      .json({ message: "Contact updated successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});


//To PATCH a contact by ID
server.patch("/contacts/:id", async (request, response) => {
  const { id } = request.params;
  const { name, email, address, phone, image } = request.body;
  try {
    await Contact.findByIdAndUpdate(objectId, {
      name,
      contact: { email, phone, address },
      image,
    });
    response.send({ message: `Contact updated successfully with the id ${id}` });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
    