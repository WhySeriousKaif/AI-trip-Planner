import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6 md:px-16 bg-cover bg-center w-full min-h-screen"
      style={{
        backgroundImage: "url('https://www.ghumindiaghum.com/blog/wp-content/uploads/2022/09/best-travel-agency.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-[#0f172a]/70 m-10 p-6 md:p-10 rounded-xl shadow-xl max-w-3xl md:max-w-4xl">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 drop-shadow-md">
          <span className="text-sky-400">Discover Your Next Adventure:</span> <br />
          Personalized Trip Planning at Your Fingertips!
        </h1>
        <p className="text-white/90 text-base sm:text-lg md:text-xl font-medium mb-14">
          Your personal travel curator, crafting itineraries tailored to your interests and budget.
        </p>
        <Link to="/create-trip">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
            Start Planning
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;