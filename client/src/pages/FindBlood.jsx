import { useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import {
  FaSearch,
  FaTint,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

function FindBlood() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.get("/donors/search", {
        params: {
          bloodGroup,
          city,
        },
      });

      setDonors(res.data.donors);
    } catch (error) {
      console.log(error);
      alert("Search Failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-red-50 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">

          <FaSearch className="text-6xl text-red-600 mx-auto mb-4" />

          <h1 className="text-4xl font-bold text-red-600">
            Find Blood Donors
          </h1>

          <p className="text-gray-600 mt-2">
            Search verified blood donors by blood group and city.
          </p>

        </div>

        {/* Search Card */}

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-xl p-8 mb-10 grid md:grid-cols-3 gap-5"
        >

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          >
            <option value="">Blood Group</option>
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
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
          >
            Search Donors
          </button>

        </form>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {donors.length === 0 ? (

            <div className="col-span-full bg-white rounded-2xl shadow-lg p-10 text-center">

              <FaTint className="text-6xl text-red-300 mx-auto mb-4" />

              <h2 className="text-2xl font-bold text-gray-700">
                No Donors Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try another blood group or city.
              </p>

            </div>

          ) : (

            donors.map((donor) => (

              <div
                key={donor._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-center mb-5">

                  <div className="flex items-center">

                    <FaUser className="text-red-600 text-xl mr-2" />

                    <h2 className="text-xl font-bold">
                      {donor.fullName}
                    </h2>

                  </div>

                  <span className="bg-red-100 text-red-600 font-bold px-3 py-1 rounded-full">
                    {donor.bloodGroup}
                  </span>

                </div>

                <div className="space-y-3">

                  <p className="flex items-center text-gray-700">

                    <FaPhone className="mr-2 text-red-600" />

                    {donor.phone}

                  </p>

                  <p className="flex items-center text-gray-700">

                    <FaMapMarkerAlt className="mr-2 text-red-600" />

                    {donor.city}, {donor.district}

                  </p>

                  <p className="text-gray-600">
                    {donor.email}
                  </p>

                </div>

                <div className="flex gap-3 mt-6">

                  <a
                    href={`tel:${donor.phone}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center font-semibold"
                  >
                    Call
                  </a>

                  <a
                    href={`https://wa.me/${donor.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-center font-semibold"
                  >
                    WhatsApp
                  </a>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default FindBlood;