require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Item = require("./models/Item");
const User = require("./models/User");
const auth = require("./middleware/auth");


const app = express();
const PORT = 3000;

app.use(express.json());

<<<<<<< HEAD
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({
      error: err.message,

console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

let items = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Keyboard" }
];

// GET ALL
app.get("/items", (req, res) => {
  res.json(items);
});

// GET ONE
app.get("/items/:id", (req, res) => {
  const item = items.find(x => x.id == req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({
      message: "Item not found"

    });
  }
});


// Protected Route
app.get("/profile", auth, (req, res) => {
  res.json({
    message: "Welcome to protected route",
    user: req.user,
  });
});

// Search Feature (Mission 3 Advanced Feature)
app.get("/items", async (req, res) => {
  try {
    const search = req.query.search || "";

    const items = await Item.find({
      name: { $regex: search, $options: "i" },
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }

// POST CREATE
app.post("/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };

  items.push(newItem);

  res.status(201).json(newItem);

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});