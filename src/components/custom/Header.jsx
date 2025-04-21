import React from "react";
import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-300 to-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img src="/logo.svg" alt="WonderMate Logo" className="h-8" />
          <span className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-600 to-blue-900 bg-clip-text text-transparent">
            WonderMate
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex gap-4 items-center text-sm sm:text-base">
          <Link
            to="/about"
            className="text-white hover:text-amber-300 hover:scale-105 transition-all duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-amber-300 hover:scale-105 transition-all duration-300"
          >
            Contact
          </Link>

          {user && (
            <>
              <Link
                to="/saved-trips"
                className="text-white hover:text-amber-300 hover:scale-105 transition-all duration-300"
              >
                View Trips
              </Link>
              <button
                onClick={handleLogout}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-1 rounded transition-all duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
