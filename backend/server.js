const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mobile" },
    { id: 3, name: "Keyboard" }
];

/* GET ALL */
app.get("/items", (req, res) => {
    res.json(items);
});

/* GET ONE */
app.get("/items/:id", (req, res) => {

    const item = items.find(
        x => x.id == req.params.id
    );

    if(item){
        res.json(item);
    } else {
        res.status(404).json({
            message: "Item not found"
        });
    }
});

/* POST CREATE */
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