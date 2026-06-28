import express from "express";
import {
  createBloodRequest,
  getAllBloodRequests,
  getMyRequests,
  searchBloodRequests,
  acceptBloodRequest,
  updateRequestStatus,
} from "../controllers/bloodRequestController.js";

const router = express.Router();

// Search Blood Requests
router.get("/search", searchBloodRequests);

// Get My Blood Requests
router.get("/my/:userId", getMyRequests);

// Get All Blood Requests
router.get("/", getAllBloodRequests);

// Create Blood Request
router.post("/", createBloodRequest);

// Accept Blood Request
router.put("/accept/:id", acceptBloodRequest);

// Update Request Status
router.put("/status/:id", updateRequestStatus);

export default router;