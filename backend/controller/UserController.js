const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// require("dotenv").config(); // Load environment variables

const generateToken = (userId) => {
  return jwt.sign({ userId }, "secretkey", { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, "secretkey");
};

exports.register = async (req, res) => {
  const { name, email, contact, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      contact,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request received:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Login successful for user:", user);
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      token,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verifyToken(token);
      console.log(decoded); // Use the secret key from environment variables
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error("Not authorized, token failed", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, contact, password } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (password) {
      // const salt = await bcrypt.genSalt(10);
      user.password = password;
    }

    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
