import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import {
  FaTint,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

function MyDonations() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/donors/my/${user.id}`);

      setDonations(res.data.donations);
    } catch (error) {
      console.log(error);
      alert("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-red-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">

          <FaTint className="text-6xl text-red-600 mx-auto mb-4" />

          <h1 className="text-4xl font-bold text-red-600">
            My Donation History
          </h1>

          <p className="text-gray-600 mt-2">
            View all your blood donor registrations.
          </p>

        </div>

        {donations.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <FaTint className="text-6xl text-red-300 mx-auto mb-4" />

            <h2 className="text-2xl font-bold text-gray-700">
              No Donations Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't registered as a donor yet.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {donations.map((donation) => (

              <div
                key={donation._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-center mb-5">

                  <h2 className="text-2xl font-bold text-red-600">
                    {donation.fullName}
                  </h2>

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">
                    {donation.bloodGroup}
                  </span>

                </div>

                <div className="space-y-3 text-gray-700">

                  <p className="flex items-center">
                    <FaPhone className="mr-2 text-red-600" />
                    {donation.phone}
                  </p>

                  <p className="flex items-center">
                    <FaEnvelope className="mr-2 text-red-600" />
                    {donation.email}
                  </p>

                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-600" />
                    {donation.city}, {donation.district}
                  </p>

                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-red-600" />
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyDonations;