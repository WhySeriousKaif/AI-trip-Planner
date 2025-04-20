import React from "react";

function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-600">
        About AI Trip Planner
      </h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img
            src="https://images.pexels.com/photos/3860092/pexels-photo-3860092.jpeg"
            alt="Travel"
            className="w-full h-auto rounded-lg shadow-md mb-6 md:mb-0"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            AI Trip Planner is a cutting-edge application designed to help you
            plan your trips with ease and efficiency. Our platform leverages
            advanced AI algorithms to provide personalized travel
            recommendations, optimize itineraries, and ensure you have the best
            travel experience possible.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're planning a weekend getaway or a month-long adventure,
            AI Trip Planner is here to assist you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
