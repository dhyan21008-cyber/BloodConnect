import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTint } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLink = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-red-600 border-b-2 border-red-600 pb-1"
        : "text-gray-700 hover:text-red-600"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <FaTint className="text-red-600 text-3xl" />

          <span className="text-3xl font-bold text-red-600">
            BloodConnect
          </span>
        </Link>

        <div className="flex items-center gap-6 flex-wrap">

          <Link to="/" className={navLink("/")}>
            Home
          </Link>

          <Link
            to="/find-blood"
            className={navLink("/find-blood")}
          >
            Find Blood
          </Link>

          {token ? (
            <>

              <Link
                to="/dashboard"
                className={navLink("/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                to="/become-donor"
                className={navLink("/become-donor")}
              >
                Donate
              </Link>

              <Link
                to="/request-blood"
                className={navLink("/request-blood")}
              >
                Request
              </Link>

              <Link
                to="/view-requests"
                className={navLink("/view-requests")}
              >
                Requests
              </Link>

              <Link
                to="/profile"
                className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-200 transition"
              >
                {user?.name}
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
              >
                Logout
              </button>

            </>
          ) : (
            <>

              <Link
                to="/login"
                className={navLink("/login")}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
              >
                Sign Up
              </Link>

            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;