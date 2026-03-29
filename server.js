// 1️⃣ IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");

// 2️⃣ APP SETUP
const app = express();
app.use(cors());
app.use(express.json());

// 3️⃣ MONGODB ATLAS CONNECTION
mongoose.connect(
  "mongodb+srv://nisha615:<nishnish890M,>@cluster0.8x8ayz9.mongodb.net/marketplace?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// 4️⃣ CRUD ROUTES

// 🔹 CREATE (POST)
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send("Product saved via POST ✅");
  } catch (err) {
    res.send(err);
  }
});

// 🔹 CREATE (GET for testing in browser)
app.get("/add-product", async (req, res) => {
  try {
    const product = new Product({
      name: req.query.name,
      price: req.query.price
    });
    await product.save();
    res.send("Product added via GET ✅");
  } catch (err) {
    res.send(err);
  }
});

// 🔹 READ
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.send(err);
  }
});

// 🔹 UPDATE
app.put("/update-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send("Product updated ✅");
  } catch (err) {
    res.send(err);
  }
});

// 🔹 DELETE
app.delete("/delete-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product deleted ✅");
  } catch (err) {
    res.send(err);
  }
});

// 5️⃣ SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});