import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
{
userId: {
type: String,
required: true,
},

patientName: {
  type: String,
  required: true,
},

bloodGroup: {
  type: String,
  required: true,
},

units: {
  type: Number,
  required: true,
},

hospital: {
  type: String,
  required: true,
},

district: {
  type: String,
  required: true,
},

city: {
  type: String,
  required: true,
},

contactName: {
  type: String,
  required: true,
},

contactPhone: {
  type: String,
  required: true,
},

urgency: {
  type: String,
  enum: ["Normal", "Urgent", "Emergency"],
  default: "Normal",
},

status: {
  type: String,
  enum: ["Pending", "Accepted", "Completed"],
  default: "Pending",
},

acceptedBy: {
  type: String,
  default: "",
},

},
{
timestamps: true,
}
);

const BloodRequest = mongoose.model(
"BloodRequest",
bloodRequestSchema
);

export default BloodRequest;