import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTint,
  FaUsers,
  FaHeartbeat,
  FaHospital,
  FaSearch,
  FaUserPlus,
  FaHandHoldingHeart,
} from "react-icons/fa";
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};
function Home() {
return (
<div className="bg-red-50">

  {/* Hero Section */}
  <section className="min-h-[90vh] flex items-center justify-center px-6">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

      <div>
        <h1 className="text-5xl md:text-6xl font-bold text-red-600 leading-tight">
          Donate Blood,
          <br />
          Save Lives
        </h1>

        <p className="mt-6 text-gray-700 text-lg">
          BloodConnect helps patients find blood donors
          quickly during emergencies while making blood
          donation easier, faster and more accessible.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap">
          <Link
            to="/become-donor"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Become Donor
          </Link>

          <Link
            to="/find-blood"
            className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white"
          >
            Find Blood
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center">
          <FaTint className="text-8xl text-red-600 mx-auto" />

          <h2 className="text-3xl font-bold mt-6">
            BloodConnect
          </h2>

          <p className="text-gray-600 mt-3">
            Connecting Donors and Patients
          </p>
        </div>
      </div>

    </div>
  </section>

  {/* About Section */}

  <section className="bg-white py-20">
    <div className="max-w-6xl mx-auto px-6 text-center">

      <h2 className="text-4xl font-bold text-red-600 mb-6">
        About BloodConnect
      </h2>

      <p className="text-gray-700 text-lg max-w-4xl mx-auto">
        BloodConnect is a platform designed to bridge the
        gap between blood donors and patients. During
        emergencies, finding the right blood donor quickly
        can save lives. Our mission is to make that process
        simple, reliable and accessible for everyone.
      </p>

    </div>
  </section>

  {/* Features Section */}

  <section className="py-20">
    <div className="max-w-6xl mx-auto px-6">

      <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
        Our Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <FaUserPlus className="text-5xl text-red-600 mx-auto mb-4" />

          <h3 className="text-2xl font-bold mb-3">
            Register as Donor
          </h3>

          <p className="text-gray-600">
            Join our network of voluntary blood donors
            and help save lives.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <FaSearch className="text-5xl text-red-600 mx-auto mb-4" />

          <h3 className="text-2xl font-bold mb-3">
            Find Blood
          </h3>

          <p className="text-gray-600">
            Search for blood donors by blood group
            and location instantly.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <FaHandHoldingHeart className="text-5xl text-red-600 mx-auto mb-4" />

          <h3 className="text-2xl font-bold mb-3">
            Request Blood
          </h3>

          <p className="text-gray-600">
            Create emergency blood requests and
            reach potential donors quickly.
          </p>
        </div>

      </div>

    </div>
  </section>

  {/* Statistics */}

  <section className="max-w-6xl mx-auto px-6 py-10">

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <FaUsers className="text-5xl text-red-600 mx-auto" />

        <h3 className="text-3xl font-bold mt-4">
          1000+
        </h3>

        <p className="text-gray-600">
          Registered Donors
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <FaHeartbeat className="text-5xl text-red-600 mx-auto" />

        <h3 className="text-3xl font-bold mt-4">
          500+
        </h3>

        <p className="text-gray-600">
          Lives Saved
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <FaHospital className="text-5xl text-red-600 mx-auto" />

        <h3 className="text-3xl font-bold mt-4">
          24/7
        </h3>

        <p className="text-gray-600">
          Emergency Support
        </p>
      </div>

    </div>

  </section>

</div>

);
}

export default Home;