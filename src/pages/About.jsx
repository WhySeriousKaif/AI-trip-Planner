import React from "react";
import { Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/custom/Header";

function About() {
  return (
    <div className="relative bg-gradient-to-r from-ice-cold to-freeze-purple bg-cover bg-center w-full min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-900/70 z-10"></div>
        <div className="h-[50vh] overflow-hidden relative">
          <img
            src="https://images.pexels.com/photos/3860092/pexels-photo-3860092.jpeg"
            alt="Travel Destination"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <Badge variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white px-4 py-1.5 mb-6 text-sm">
              AI-Powered Travel Planning
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
              About WonderMate
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Your AI companion for creating unforgettable travel experiences tailored just for you
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-8">Our Mission</h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          WonderMate is a cutting-edge application designed to revolutionize how you plan your trips. 
          Our platform leverages advanced AI algorithms to provide personalized travel recommendations, 
          optimize itineraries, and ensure you have the best travel experience possible.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-4 py-2 text-base">Personalized</Badge>
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-4 py-2 text-base">Efficient</Badge>
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-4 py-2 text-base">Intelligent</Badge>
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-4 py-2 text-base">User-friendly</Badge>
        </div>
      </div>
    </div>
  );
}

export default About;