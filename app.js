require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

// Connect to MongoDB using environment variable
async function main() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI not defined in .env file");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
    }
}
main();


// Use dynamic port for Render
const port = process.env.PORT || 8000;

// Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

const Contact = mongoose.model("Contact", contactSchema);

// Express Setup
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

// Pug Setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
    res.status(200).render("home.pug");
});

app.get("/contact", (req, res) => {
    res.status(200).render("contact.pug");
});

app.post("/contact", (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Item has been saved to the database");
    }).catch(() => {
        res.status(400).send("Item was not saved to the database");
    });
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Application running on port ${port}`);
});
