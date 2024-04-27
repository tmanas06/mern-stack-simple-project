// Backend - server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const MONGB_URL = "mongodb://127.0.0.1:27017/ecommerce";

app.use(cors());
app.use(express.json());

mongoose.connect(MONGB_URL);
const db = mongoose.connection;``

db.on("error", (err) => {
    console.log("Error in connecting to the database:", err);
});

db.once("open", () => {
    console.log("Connected to the database");
});

const orderSchema = new mongoose.Schema({
    products: [String], // Assuming product names are stored as strings
    shippingDetails: {
        address: String,
        contact: String
    }
});

const Order = mongoose.model("Order", orderSchema);

app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error during order submission:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
