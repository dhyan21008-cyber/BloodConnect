import { useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import { FaUserPlus } from "react-icons/fa";

function BecomeDonor() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    district: "",
    city: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/donors/register", formData);

      alert(res.data.message);

      setFormData({
        fullName: "",
        age: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        email: "",
        district: "",
        city: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-red-50 py-10 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <FaUserPlus className="text-6xl text-red-600 mx-auto mb-4" />

          <h1 className="text-4xl font-bold text-red-600">
            Become a Blood Donor
          </h1>

          <p className="text-gray-600 mt-2">
            Register yourself and help save lives.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Full Name */}

          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          {/* Age */}

          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          {/* Gender */}

          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {/* Blood Group */}

          <select
            value={formData.bloodGroup}
            onChange={(e) =>
              setFormData({ ...formData, bloodGroup: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
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

          {/* Phone */}

          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          {/* Email */}

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          {/* District */}

          <input
            type="text"
            placeholder="District"
            value={formData.district}
            onChange={(e) =>
              setFormData({ ...formData, district: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          {/* City */}

          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          {/* Address */}

          <textarea
            placeholder="Complete Address"
            rows="4"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="md:col-span-2 w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          {/* Submit Button */}

          <button
            type="submit"
            className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            Register as Donor ❤️
          </button>

        </form>

      </div>

    </div>
  );
}

export default BecomeDonor;