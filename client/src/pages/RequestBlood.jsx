import { useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import { FaTint } from "react-icons/fa";

function RequestBlood() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userId: user?.id || "",
    patientName: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    district: "",
    city: "",
    contactName: "",
    contactPhone: "",
    urgency: "Normal",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post(
        "/blood-requests",
        formData
      );

      alert(res.data.message);

      setFormData({
        userId: user?.id || "",
        patientName: "",
        bloodGroup: "",
        units: "",
        hospital: "",
        district: "",
        city: "",
        contactName: "",
        contactPhone: "",
        urgency: "Normal",
      });

    } catch (error) {
      console.log(error);
      alert("Failed to create blood request");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-red-50 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <FaTint className="text-6xl text-red-600 mx-auto mb-4" />

          <h1 className="text-4xl font-bold text-red-600">
            Request Blood
          </h1>

          <p className="text-gray-600 mt-2">
            Fill in the details below to create a blood request.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={(e) =>
              setFormData({ ...formData, patientName: e.target.value })
            }
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <select
            value={formData.bloodGroup}
            onChange={(e) =>
              setFormData({ ...formData, bloodGroup: e.target.value })
            }
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input
            type="number"
            placeholder="Units Required"
            value={formData.units}
            onChange={(e) =>
              setFormData({ ...formData, units: e.target.value })
            }
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Hospital Name"
            value={formData.hospital}
            onChange={(e) =>
              setFormData({ ...formData, hospital: e.target.value })
            }
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <input
            type="text"
            placeholder="District"
            value={formData.district}
            onChange={(e) =>
              setFormData({ ...formData, district: e.target.value })
            }
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Contact Person"
            value={formData.contactName}
            onChange={(e) =>
              setFormData({
                ...formData,
                contactName: e.target.value,
              })
            }
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <input
            type="tel"
            placeholder="Contact Phone"
            value={formData.contactPhone}
            onChange={(e) =>
              setFormData({
                ...formData,
                contactPhone: e.target.value,
              })
            }
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <select
            value={formData.urgency}
            onChange={(e) =>
              setFormData({
                ...formData,
                urgency: e.target.value,
              })
            }
            className="md:col-span-2 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option>Normal</option>
            <option>Urgent</option>
            <option>Emergency</option>
          </select>

          <button
            type="submit"
            className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition"
          >
            Submit Blood Request 🩸
          </button>

        </form>

      </div>

    </div>
  );
}

export default RequestBlood;