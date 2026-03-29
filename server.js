// 1. imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");

// 2. app setup
const app = express();
app.use(cors());
app.use(express.json());

// 3. DB connect
mongoose.connect("mongodb://127.0.0.1:27017/marketplace")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔥 4. CRUD ROUTES

// ✅ CREATE (POST)
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send("Saved");
  } catch (err) {
    res.send(err);
  }
});

// 🔹 ✅ CREATE (GET via browser query string) – temporary easy method
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

// ✅ READ
app.get("/products", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.send(err);
  }
});

// ✅ UPDATE
app.put("/update-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated");
  } catch (err) {
    res.send(err);
  }
});

// ✅ DELETE
app.delete("/delete-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.send(err);
  }
});

// 5. server start
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});