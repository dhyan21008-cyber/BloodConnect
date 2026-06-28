import Donor from "../models/Donor.js";

// Register Donor
export const registerDonor = async (req, res) => {
try {
const donor = await Donor.create(req.body);

res.status(201).json({
  success: true,
  message: "Donor Registered Successfully",
  donor,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Get All Donors
export const getAllDonors = async (req, res) => {
try {
const donors = await Donor.find();

res.status(200).json({
  success: true,
  count: donors.length,
  donors,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Search Donors
export const searchDonors = async (req, res) => {
try {
const { bloodGroup, district } = req.query;

const query = {};

if (bloodGroup) {
  query.bloodGroup = bloodGroup;
}

if (district) {
  query.district = new RegExp(`^${district}$`, "i");
}

const donors = await Donor.find(query);

res.status(200).json({
  success: true,
  count: donors.length,
  donors,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// My Donations
export const getMyDonations = async (req, res) => {
try {
const donors = await Donor.find({
user: req.params.userId,
});

res.status(200).json({
  success: true,
  count: donors.length,
  donors,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Delete Donor
export const deleteDonor = async (req, res) => {
try {
const donor = await Donor.findByIdAndDelete(req.params.id);

if (!donor) {
  return res.status(404).json({
    success: false,
    message: "Donor not found",
  });
}

res.status(200).json({
  success: true,
  message: "Donor deleted successfully",
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};