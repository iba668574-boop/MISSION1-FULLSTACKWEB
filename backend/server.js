require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());

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