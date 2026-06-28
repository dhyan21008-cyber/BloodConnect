import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await API.get("/users");
      const donorRes = await API.get("/donors");
      const requestRes = await API.get("/blood-requests");

      setUsers(userRes.data.users || []);
      setDonors(donorRes.data.donors || []);
      setRequests(requestRes.data.requests || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/profile/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDonor = async (id) => {
    try {
      await API.delete(`/donors/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDonors = donors.filter(
    (donor) =>
      donor.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      donor.bloodGroup?.toLowerCase().includes(search.toLowerCase()) ||
      donor.district?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-red-600 mb-8">
          Admin Dashboard
        </h1>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Users</h3>
            <h1 className="text-4xl font-bold text-red-600">
              {users.length}
            </h1>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Donors</h3>
            <h1 className="text-4xl font-bold text-green-600">
              {donors.length}
            </h1>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-500">Requests</h3>
            <h1 className="text-4xl font-bold text-blue-600">
              {requests.length}
            </h1>
          </div>

        </div>

        {/* User Management */}

        <div className="bg-white rounded-xl shadow p-6 mb-10">

          <h2 className="text-2xl font-bold mb-4">
            User Management
          </h2>

          <table className="w-full border">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b text-center"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Donor Management */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold">
              Donor Management
            </h2>

            <input
              type="text"
              placeholder="Search Donors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-lg"
            />

          </div>

          <table className="w-full border">

            <thead className="bg-green-600 text-white">

              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Blood Group</th>
                <th className="p-3">District</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredDonors.map((donor) => (
                <tr
                  key={donor._id}
                  className="border-b text-center"
                >
                  <td className="p-3">
                    {donor.fullName}
                  </td>

                  <td className="p-3">
                    {donor.bloodGroup}
                  </td>

                  <td className="p-3">
                    {donor.district}
                  </td>

                  <td className="p-3">
                    {donor.phone}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteDonor(donor._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;