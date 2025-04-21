import React, { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-300 to-indigo-700 shadow-md   w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img src="/logo.svg" alt="WonderMate Logo" className="h-8" />
          <span className="text-2xl font-bold ">
            WonderMate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center text-sm sm:text-base">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {/* Icon for mobile menu, e.g., a hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-700">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              to="/about"
              className="text-white hover:text-amber-300 transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-amber-300 transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>

            {user && (
              <>
                <Link
                  to="/saved-trips"
                  className="text-white hover:text-amber-300 transition-all duration-300"
                  onClick={toggleMobileMenu}
                >
                  View Trips
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-1 rounded transition-all duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
