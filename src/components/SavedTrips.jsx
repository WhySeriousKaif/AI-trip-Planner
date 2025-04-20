import React, { useState, useEffect } from "react";

const SavedTrips = () => {
  const [savedTrips, setSavedTrips] = useState([]);

  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
    setSavedTrips(trips);
  }, []);

  return (
    <div className="bg-gradient-to-r from-ice-cold to-freeze-purple p-6 rounded-lg shadow-md">
      <h2 className="font-bold text-3xl mb-6 text-center text-gray-800">
        Saved Trips
      </h2>
      {savedTrips.length === 0 ? (
        <p className="text-center text-gray-700">No saved trips available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {savedTrips.map((trip, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">{trip.name || `Trip ${index + 1}`}</h3>
              <p className="text-gray-600">{trip.description || "No description available."}</p>
              {/* Add more trip details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTrips;

