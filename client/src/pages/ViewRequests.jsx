import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import {
  FaSearch,
  FaTint,
} from "react-icons/fa";

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await API.get("/blood-requests");

      setRequests(res.data.requests);
    } catch (error) {
      console.log(error);
      alert("Failed to load blood requests");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.get("/blood-requests/search", {
        params: {
          bloodGroup,
          district,
        },
      });

      setRequests(res.data.requests);
    } catch (error) {
      console.log(error);
      alert("Search Failed");
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.put(`/blood-requests/accept/${id}`, {
        acceptedBy: user?.name,
      });

      alert("Request Accepted Successfully");

      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Failed to accept request");
    }
  };

  const completeRequest = async (id) => {
    try {
      await API.put(`/blood-requests/status/${id}`, {
        status: "Completed",
      });

      alert("Request Marked Completed");

      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Failed to update request");
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
            Blood Requests
          </h1>

          <p className="text-gray-600">
            Search and respond to blood requests.
          </p>

        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-xl p-8 mb-10 grid md:grid-cols-3 gap-5"
        >

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="border rounded-xl p-3"
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
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="border rounded-xl p-3"
          />

          <button
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold"
          >
            <FaSearch className="inline mr-2" />
            Search
          </button>

        </form>
        <div className="grid gap-6">

          {requests.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <FaTint className="text-6xl text-red-300 mx-auto mb-4" />

              <h2 className="text-2xl font-bold text-gray-700">
                No Blood Requests Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing your search filters.
              </p>

            </div>

          ) : (

            requests.map((request) => (

              <div
                key={request._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

                  <div>

                    <h2 className="text-2xl font-bold text-red-600">
                      {request.patientName}
                    </h2>

                    <p className="text-gray-500">
                      {request.hospital}
                    </p>

                  </div>

                  <div className="flex gap-3 flex-wrap">

                    <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold">
                      {request.bloodGroup}
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full font-bold ${
                        request.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : request.status === "Accepted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {request.status}
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full font-bold ${
                        request.urgency === "Emergency"
                          ? "bg-red-600 text-white"
                          : request.urgency === "Urgent"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {request.urgency}
                    </span>

                  </div>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                  <p>
                    <strong>Units:</strong> {request.units}
                  </p>

                  <p>
                    <strong>District:</strong> {request.district}
                  </p>

                  <p>
                    <strong>City:</strong> {request.city}
                  </p>

                  <p>
                    <strong>Contact:</strong> {request.contactName}
                  </p>

                  <p>
                    <strong>Phone:</strong> {request.contactPhone}
                  </p>

                  {request.acceptedBy && (
                    <p>
                      <strong>Accepted By:</strong> {request.acceptedBy}
                    </p>
                  )}

                </div>

                <div className="flex flex-wrap gap-3 mt-6">

                  <a
                    href={`tel:${request.contactPhone}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    📞 Call
                  </a>

                  <a
                    href={`https://wa.me/${request.contactPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    💬 WhatsApp
                  </a>

                  {request.status === "Pending" && (
                    <button
                      onClick={() => acceptRequest(request._id)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg"
                    >
                      Accept Request
                    </button>
                  )}

                  {request.status === "Accepted" && (
                    <button
                      onClick={() => completeRequest(request._id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
                    >
                      Mark Completed
                    </button>
                  )}

                </div>

                <p className="mt-5 text-sm text-gray-500">
                  Requested on{" "}
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>

              </div>

            ))

          )}
          {/* Emergency Contact */}

<div className="mt-10 bg-white rounded-2xl shadow-lg p-8 border-l-8 border-red-600">

  <h2 className="text-3xl font-bold text-red-600 mb-4">
    🚨 Emergency Support
  </h2>

  <p className="text-gray-700 mb-6">
    If you need blood immediately, don't wait. Contact our emergency
    helpline or send us a WhatsApp message. Our volunteers will try to
    connect you with nearby donors as quickly as possible.
  </p>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-red-50 rounded-xl p-5">

      <h3 className="font-bold text-xl mb-2">
        📞 Emergency Helpline
      </h3>

      <p className="text-gray-700 mb-4">
        +91 98765 43210
      </p>

      <a
        href="tel:+919876543210"
        className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
      >
        Call Now
      </a>

    </div>

    <div className="bg-green-50 rounded-xl p-5">

      <h3 className="font-bold text-xl mb-2">
        💬 WhatsApp Support
      </h3>

      <p className="text-gray-700 mb-4">
        Chat with our volunteer team instantly.
      </p>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        WhatsApp
      </a>

    </div>

  </div>

  <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg">

    <h3 className="font-bold text-lg mb-2">
      ❤️ Emergency Tips
    </h3>

    <ul className="list-disc ml-6 space-y-2 text-gray-700">
      <li>Stay calm and contact the hospital immediately.</li>
      <li>Keep the patient's blood group ready.</li>
      <li>Share the blood request with family and friends.</li>
      <li>Carry the patient's medical documents if required.</li>
    </ul>

  </div>

</div>

        </div>

      </div>

    </div>
  );
}

export default ViewRequests;