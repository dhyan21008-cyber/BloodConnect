import express from "express";
import {
  registerDonor,
  getAllDonors,
  searchDonors,
  getMyDonations,
} from "../controllers/donorController.js";

const router = express.Router();

// Register Donor
router.post("/register", registerDonor);

// Get All Donors
router.get("/", getAllDonors);

// Search Donors
router.get("/search", searchDonors);

// Get My Donation History
router.get("/my/:userId", getMyDonations);

export default router;