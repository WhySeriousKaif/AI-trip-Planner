import React, { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
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
    <>
      {/* Style block for animated color cycling */}
      <style>{`
 @keyframes colorCycle {
  0%   { color: #ef4444; }   /* red-500 */
  20%  { color: #f59e0b; }   /* amber-500 */
  40%  { color: #10b981; }   /* emerald-500 */
  60%  { color: #3b82f6; }   /* blue-500 */
  80%  { color: #a855f7; }   /* purple-500 */
  100% { color: #ef4444; }
}

        .animate-color-cycle {
          animation: colorCycle 5s infinite ease-in-out;
        }

        .logout-animated {
          animation: colorCycle 5s infinite ease-in-out;
          border: 2px solid white;
        }
      `}</style>

      <div className="w-full z-50 fixed top-0 bg-transparent">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity mr-4"
          >
            <img src="/logo.svg" alt="WonderMate Logo" className="h-8" />
            <span className="text-2xl font-bold animate-color-cycle">
              WonderMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 items-center text-sm sm:text-base">
            <Link
              to="/about"
              className="font-extrabold animate-color-cycle hover:text-amber-300 hover:bg-gray-100 px-3 py-1 rounded transition-all duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="font-extrabold animate-color-cycle hover:text-amber-300 hover:bg-gray-100 px-3 py-1 rounded transition-all duration-300"
            >
              Contact
            </Link>

            {user && (
              <>
                <Link
                  to="/saved-trips"
                  className="font-extrabold animate-color-cycle hover:text-amber-300 hover:bg-gray-100 px-3 py-1 rounded transition-all duration-300"
                >
                  View Trips
                </Link>
                <button
                  onClick={handleLogout}
                  className="logout-animated bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold px-4 py-1 rounded-lg transition-all duration-300 text-sm shadow"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden transparent">
            <div className="flex flex-col items-center gap-4 py-4">
              <Link
                to="/about"
                className="animate-color-cycle hover:text-amber-300 hover:bg-gray-800 px-3 py-1 rounded transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="animate-color-cycle hover:text-amber-300 hover:bg-gray-800 px-3 py-1 rounded transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>

              {user && (
                <>
                  <Link
                    to="/saved-trips"
                    className="animate-color-cycle hover:text-amber-300 hover:bg-gray-800 px-3 py-1 rounded transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    View Trips
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="logout-animated bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-1 rounded transition-all duration-300 text-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
