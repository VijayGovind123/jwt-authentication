const multer = require("multer");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
const userRoutes = require("./routes/authroutes");

app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/new3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not connected to MongoDB");
    console.log(err);
  });

app.use("/api", userRoutes);

app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  console.log("In image", filename);
  res.sendFile(path.join(__dirname, "./uploads", filename));
});

app.get("/api/tiles", (req, res) => {
  console.log(req);
  res.json("Hello");
});

app.listen(4000, () => console.log("Server is running on port 4000"));
