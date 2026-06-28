import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "mysecretkey";

// Register User
export const registerUser = async (req, res) => {
try {
const { name, email, password } = req.body;

const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "User already exists",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

res.status(201).json({
  success: true,
  message: "User Registered Successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Login User
export const loginUser = async (req, res) => {
try {
const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user) {
  return res.status(400).json({
    success: false,
    message: "Invalid Email or Password",
  });
}

const isMatch = await bcrypt.compare(
  password,
  user.password
);

if (!isMatch) {
  return res.status(400).json({
    success: false,
    message: "Invalid Email or Password",
  });
}

const token = jwt.sign(
  { id: user._id },
  JWT_SECRET,
  { expiresIn: "7d" }
);

res.status(200).json({
  success: true,
  message: "Login Successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Update Profile
export const updateProfile = async (req, res) => {
try {
const { id } = req.params;
const { name, email } = req.body;

const user = await User.findByIdAndUpdate(
  id,
  { name, email },
  { new: true }
);

res.status(200).json({
  success: true,
  message: "Profile Updated Successfully",
  user,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Delete Account
export const deleteAccount = async (req, res) => {
try {
const { id } = req.params;

await User.findByIdAndDelete(id);

res.status(200).json({
  success: true,
  message: "Account Deleted Successfully",
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Get All Users
export const getAllUsers = async (req, res) => {
try {
const users = await User.find().select("-password");

res.status(200).json({
  success: true,
  count: users.length,
  users,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};