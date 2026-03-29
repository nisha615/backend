// 1️⃣ IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 2️⃣ PRODUCT MODEL
const productSchema = new mongoose.Schema({
  name: String,
  price: String
});
const Product = mongoose.model("Product", productSchema);

// 3️⃣ APP SETUP
const app = express();
app.use(cors());
app.use(express.json());

// 4️⃣ MONGODB ATLAS CONNECTION
mongoose.connect(
  "mongodb+srv://nisha615:nishnish890M@cluster0.8x8ayz9.mongodb.net/marketplace?retryWrites=true&w=majority"
)
.then(() => {
  console.log("MongoDB Connected ✅");

  // Add sample products automatically if DB is empty
  Product.countDocuments().then(count => {
    if (count === 0) {
      const sampleProducts = [
        { name: "Phone", price: "10000" },
        { name: "Laptop", price: "50000" },
        { name: "Headphones", price: "2000" },
        { name: "Tablet", price: "15000" },
        { name: "Smartwatch", price: "8000" }
      ];
      Product.insertMany(sampleProducts)
        .then(() => console.log("Sample products added ✅"))
        .catch(err => console.log(err));
    }
  });
})
.catch(err => console.log(err));

// 5️⃣ CRUD ROUTES

// 🔹 ADD PRODUCT (POST)
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send("Product saved via POST ✅");
  } catch (err) {
    res.send(err);
  }
});

// 🔹 ADD PRODUCT (GET for browser testing)
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

// 🔹 GET ALL PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.send(err);
  }
});

// 🔹 UPDATE PRODUCT
app.put("/update-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send("Product updated ✅");
  } catch (err) {
    res.send(err);
  }
});

// 🔹 DELETE PRODUCT
app.delete("/delete-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product deleted ✅");
  } catch (err) {
    res.send(err);
  }
});

// 6️⃣ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});