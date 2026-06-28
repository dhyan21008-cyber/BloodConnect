import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import { FaTint } from "react-icons/fa";

function MyRequests() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/blood-requests/my/${user.id}`);

      setRequests(res.data.requests);
    } catch (error) {
      console.log(error);
      alert("Failed to load requests");
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
            My Blood Requests
          </h1>

          <p className="text-gray-600 mt-2">
            Track all the blood requests you have created.
          </p>

        </div>

        {requests.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <FaTint className="text-6xl text-red-300 mx-auto mb-4" />

            <h2 className="text-2xl font-bold text-gray-700">
              No Requests Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't created any blood requests yet.
            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {requests.map((request) => (

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

                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">
                      {request.bloodGroup}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full font-bold ${
                        request.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : request.status === "Accepted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {request.status}
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
                    <strong>Urgency:</strong> {request.urgency}
                  </p>

                  {request.acceptedBy && (
                    <p>
                      <strong>Accepted By:</strong> {request.acceptedBy}
                    </p>
                  )}

                </div>

                <p className="mt-5 text-sm text-gray-500">
                  Created on{" "}
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyRequests;