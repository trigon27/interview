const User = require("../model/User");
const bcrypt = require("bcryptjs");
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

    // // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

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
    // Log incoming request data
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

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
