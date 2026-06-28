import { useState } from "react";
import API from "../services/api";

function Register() {
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
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Become a Blood Donor ❤️
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            value={formData.bloodGroup}
            onChange={(e) =>
              setFormData({ ...formData, bloodGroup: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
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
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <input
            type="text"
            placeholder="District"
            value={formData.district}
            onChange={(e) =>
              setFormData({ ...formData, district: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <textarea
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            rows="3"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;