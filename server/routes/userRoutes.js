import express from "express";
import {
registerUser,
loginUser,
updateProfile,
deleteAccount,
getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get All Users
router.get("/", getAllUsers);

// Update User Profile
router.put("/profile/:id", updateProfile);

// Delete User Account
router.delete("/profile/:id", deleteAccount);

export default router;