import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Register from "./pages/Register";
import FindBlood from "./pages/FindBlood";
import BecomeDonor from "./pages/BecomeDonor";
import Profile from "./pages/Profile";
import RequestBlood from "./pages/RequestBlood";
import ViewRequests from "./pages/ViewRequests";
import Dashboard from "./pages/Dashboard";
import MyDonations from "./pages/MyDonations";
import MyRequests from "./pages/MyRequests";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find-blood" element={<FindBlood />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/become-donor"
            element={
              <ProtectedRoute>
                <BecomeDonor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-donations"
            element={
              <ProtectedRoute>
                <MyDonations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-requests"
            element={
              <ProtectedRoute>
                <MyRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/request-blood"
            element={
              <ProtectedRoute>
                <RequestBlood />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-requests"
            element={
              <ProtectedRoute>
                <ViewRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;