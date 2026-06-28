import BloodRequest from "../models/BloodRequest.js";

// Create Blood Request
export const createBloodRequest = async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.create(req.body);

    res.status(201).json({
      success: true,
      message: "Blood Request Created Successfully",
      bloodRequest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Blood Requests
export const getAllBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Blood Requests
export const searchBloodRequests = async (req, res) => {
  try {
    const { bloodGroup, district } = req.query;

    const query = {};

    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    if (district) {
      query.district = new RegExp(`^${district}$`, "i");
    }

    const requests = await BloodRequest.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Requests
export const getMyRequests = async (req, res) => {
  try {
    console.log("========== MY REQUESTS ==========");
    console.log("User ID Received:", req.params.userId);

    const allRequests = await BloodRequest.find();

    console.log("All Blood Requests:");
    console.log(allRequests);

    const requests = await BloodRequest.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    console.log("Matched Requests:");
    console.log(requests);

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Accept Blood Request
export const acceptBloodRequest = async (req, res) => {
  try {
    const { acceptedBy } = req.body;

    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: "Accepted",
        acceptedBy,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Request Accepted Successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Request Status
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Request Status Updated",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};