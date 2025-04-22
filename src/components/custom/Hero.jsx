import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/custom/Header";



const Hero = () => {
  return (
    <>
      {/* Animated Text Styles */}
      <style>{`
        @keyframes pulseColor {
          0% { color: #0ea5e9; }   /* sky-400 */
          25% { color: #fbbf24; }  /* amber-400 */
          50% { color: #10b981; }  /* emerald-500 */
          75% { color: #ec4899; }  /* pink-500 */
          100% { color: #0ea5e9; }
        }

        .animated-heading {
          animation: pulseColor 6s infinite ease-in-out;
        }

        .animated-cta {
          animation: pulseColor 4s infinite ease-in-out;
        }
      `}</style>

      <div
        className="relative flex flex-col items-center justify-center text-center px-6 md:px-16 bg-cover bg-center w-full min-h-screen"
        style={{
          backgroundImage: "url('/GIF by The Last Tourist.gif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Header />

        {/* Main Content */}
        <div className="bg-[#0f172a]/70 m-10 p-6 md:p-10 rounded-xl shadow-xl max-w-3xl md:max-w-4xl">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 drop-shadow-md">
            <span className="animated-heading">
              Discover Your Next Adventure:
            </span>
            <br />
            <span className="animated-cta">
              Personalized Trip Planning at Your Fingertips!
            </span>
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
    </>
  );
};

export default Hero;