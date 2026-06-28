import { Link } from "react-router-dom";
import {
  FaTint,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* Logo */}

        <div>

          <div className="flex items-center gap-2 mb-4">

            <FaTint className="text-red-500 text-3xl" />

            <h2 className="text-2xl font-bold">
              BloodConnect
            </h2>

          </div>

          <p className="text-gray-400">
            Connecting blood donors with patients to save
            lives quickly and efficiently.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2">

            <Link to="/" className="hover:text-red-400">
              Home
            </Link>

            <Link
              to="/find-blood"
              className="hover:text-red-400"
            >
              Find Blood
            </Link>

            <Link
              to="/become-donor"
              className="hover:text-red-400"
            >
              Become Donor
            </Link>

            <Link
              to="/request-blood"
              className="hover:text-red-400"
            >
              Request Blood
            </Link>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p className="flex items-center gap-2 mb-3">
            <FaPhone />
            +91 98765 43210
          </p>

          <p className="flex items-center gap-2 mb-3">
            <FaEnvelope />
            support@bloodconnect.com
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt />
            Kerala, India
          </p>

        </div>

        {/* Emergency */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Emergency
          </h3>

          <p className="text-gray-400">
            Blood donation saves lives. Register today and
            become someone's hero.
          </p>

        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center">

        <p className="flex justify-center items-center gap-2 text-gray-400">

          Made with
          <FaHeart className="text-red-500" />
          by BloodConnect Team

        </p>

        <p className="text-sm text-gray-500 mt-2">
          © 2026 BloodConnect. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;