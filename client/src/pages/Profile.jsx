import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import { FaUserCircle, FaEnvelope, FaUserEdit, FaTrash } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.put(
        `/users/profile/${storedUser.id}`,
        formData
      );

      const updatedUser = {
        id: res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile Updated Successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Profile Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete your account permanently?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await API.delete(
        `/users/profile/${storedUser.id}`
      );

      alert(res.data.message);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-red-50 py-10 px-4">

      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center">

          <FaUserCircle className="text-8xl text-red-600 mx-auto" />

          <h1 className="text-3xl font-bold text-red-600 mt-4">
            My Profile
          </h1>

          <p className="text-gray-500">
            Manage your account details
          </p>

        </div>

        <form
          onSubmit={handleUpdate}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaUserEdit />
              Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />

          </div>

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaEnvelope />
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
          >
            Update Profile
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-gray-800 hover:bg-black text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <FaTrash />
            Delete Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;