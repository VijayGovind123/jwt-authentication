const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, username, password } = req.body;
  const imgUrl = req.file.filename;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
      profileImage: imgUrl,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, "KishoreAnde");
    res.json({ status: "ok", user: newUser, token: token });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate Email" });
  }
};

const loginUser = async (req, res) => {
  console.log("In login", req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ id: user._id }, "KishoreAnde");
        res.json({ status: "success", user: user, jwttoken: token });
      } else {
        res.json({ status: "error", error: "Invalid password" });
      }
    } else {
      res.json({ status: "error", error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid username or password" });
  }
};

const getUser = async (req, res) => {
  try {
    const ourUser = await User.findOne({ _id: req.user });
    if (ourUser) {
      res.json({ status: "ok", user: ourUser });
    } else {
      res.json({ status: "error", error: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUser, registerUser, loginUser };
