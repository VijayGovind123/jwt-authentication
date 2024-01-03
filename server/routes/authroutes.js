const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");
// Define your storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Define the file name
  },
});

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const secretKey = "KishoreAnde";
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// router.use("/uploads", express.static("uploads"));
const upload = multer({ storage });
router.post("/register", upload.single("image"), userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/user", verifyToken, userController.getUser);

module.exports = router;
