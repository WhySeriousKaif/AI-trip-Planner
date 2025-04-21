import React from "react";
import { googleLogout } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { loginWithGoogle } = useGoogleAuth();

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    // Handle the login success, e.g., save user info to local storage
    const user = { token: credentialResponse.credential };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload();
  };

  const handleLoginError = () => {
    console.error("Login Failed");
    alert("Google Sign-In failed. Please try again.");
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-pink-300 to-yellow-500 text-white shadow-lg rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-300">
          <img src="/logo.svg" alt="WonderMate Logo" className="h-8 sm:h-10" />
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide">WonderMate</h1>
        </Link>

        {/* Navigation and User Profile */}
        <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
          {/* New Navigation Links */}
          <Link to="/about" className="hover:underline hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base">
            Contact Us
          </Link>

          {user ? (
            <>
              <Link to="/saved-trips" className="hover:underline hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base">
                View Trips
              </Link>
              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture || user?.profilePicture}
                    alt="User"
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full cursor-pointer object-cover border-2 border-white hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/40"; // Fallback image
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-48 sm:w-56 bg-white text-gray-800 shadow-xl rounded-lg">
                  <div className="p-4">
                    <div className="mb-3 pb-3 border-b">
                      <p className="font-semibold">{user?.name || user?.email}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      className="w-full text-left text-red-600 hover:text-red-800 transition-colors py-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
