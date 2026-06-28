import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaTint,
  FaClipboardList,
  FaUserCircle,
  FaHandHoldingMedical,
  FaSearch,
  FaHeartbeat,
  FaUserEdit,
} from "react-icons/fa";
import API from "../services/api";
import Loader from "../components/Loader";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);

  const [totalDonors, setTotalDonors] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  const [recentDonors, setRecentDonors] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const donorRes = await API.get("/donors");
      const requestRes = await API.get("/blood-requests");

      setTotalDonors(donorRes.data.count);
      setTotalRequests(requestRes.data.count);

      setRecentDonors(donorRes.data.donors.slice(0, 5));
      setRecentRequests(requestRes.data.requests.slice(0, 5));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-red-50 py-8 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Welcome */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h1 className="text-4xl font-bold text-red-600">
            Welcome, {user?.name}
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your blood donations and requests from one place.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

            <FaUsers className="text-5xl text-red-600 mb-4" />

            <p className="text-gray-500">
              Total Donors
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {totalDonors}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

            <FaClipboardList className="text-5xl text-blue-600 mb-4" />

            <p className="text-gray-500">
              Blood Requests
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {totalRequests}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

            <FaHeartbeat className="text-5xl text-green-600 mb-4" />

            <p className="text-gray-500">
              Account Status
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              Active
            </h2>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

          <h2 className="text-3xl font-bold text-red-600 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            <Link
              to="/become-donor"
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl p-5 text-center transition shadow-lg"
            >
              <FaTint className="mx-auto text-3xl mb-3" />
              Become Donor
            </Link>

            <Link
              to="/find-blood"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 text-center transition shadow-lg"
            >
              <FaSearch className="mx-auto text-3xl mb-3" />
              Find Blood
            </Link>

            <Link
              to="/request-blood"
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 text-center transition shadow-lg"
            >
              <FaHandHoldingMedical className="mx-auto text-3xl mb-3" />
              Request Blood
            </Link>

            <Link
              to="/profile"
              className="bg-gray-700 hover:bg-black text-white rounded-xl p-5 text-center transition shadow-lg"
            >
              <FaUserEdit className="mx-auto text-3xl mb-3" />
              My Profile
            </Link>

          </div>

        </div>

        {/* Recent Activity */}
        {/* Recent Activity */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Recent Donors */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center mb-6">
              <FaUsers className="text-red-600 text-2xl mr-3" />
              <h2 className="text-2xl font-bold">
                Recent Donors
              </h2>
            </div>

            {recentDonors.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No donors available.
              </p>
            ) : (
              recentDonors.map((donor) => (
                <div
                  key={donor._id}
                  className="flex justify-between items-center border-b py-4 last:border-none"
                >
                  <div>

                    <h3 className="font-semibold text-lg">
                      {donor.fullName}
                    </h3>

                    <p className="text-gray-500">
                      {donor.city}, {donor.district}
                    </p>

                  </div>

                  <span className="bg-red-100 text-red-600 font-bold px-4 py-2 rounded-full">
                    {donor.bloodGroup}
                  </span>

                </div>
              ))
            )}

          </div>

          {/* Recent Blood Requests */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center mb-6">
              <FaClipboardList className="text-blue-600 text-2xl mr-3" />
              <h2 className="text-2xl font-bold">
                Recent Requests
              </h2>
            </div>

            {recentRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No blood requests available.
              </p>
            ) : (
              recentRequests.map((request) => (
                <div
                  key={request._id}
                  className="border-b py-4 last:border-none"
                >
                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="font-semibold text-lg">
                        {request.patientName}
                      </h3>

                      <p className="text-gray-500">
                        {request.hospital}
                      </p>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : request.status === "Accepted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {request.status}
                    </span>

                  </div>

                  <div className="flex justify-between mt-3 text-sm text-gray-600">

                    <span>
                      {request.bloodGroup}
                    </span>

                    <span>
                      {request.city}
                    </span>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;