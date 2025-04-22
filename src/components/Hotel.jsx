import React, { useEffect, useState } from "react";

const Hotel = ({ trip }) => {
  const [loading, setLoading] = useState(true);

  // Get hotels data
  const Allhotels =
    trip?.tripPlan?.travelPlan?.hotels ||
    trip?.tripPlan?.travel_plan?.hotels ||
    trip?.tripPlan?.hotels ||
    trip?.tripPlan?.[0]?.hotels ||
    [];
  console.log("Allhotels", Allhotels);

  useEffect(() => {
    setLoading(false);
  }, [trip, Allhotels]);

  // Render loading state
  if (!trip || loading) {
    return (
      <div className="mt-6 text-center">
        <h2 className="font-bold text-2xl mb-4 text-center">
          Hotel Recommendations
        </h2>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700">Loading hotel recommendations...</p>
        </div>
      </div>
    );
  }

  // Render empty state
  if (!Array.isArray(Allhotels) || Allhotels.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="font-bold text-2xl mb-4">Hotel Recommendations</h2>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700">
            No hotel recommendations available at the moment.
          </p>
        </div>
      </div>
    );
  }

  // Render hotels
  return (
    <div className="mt-6 bg-gray-100 p-6 rounded-xl shadow-md">
      <h2 className="font-bold text-2xl mb-4 text-gray-800">
        Hotel Recommendations
      </h2>

      <div className="space-y-6">
        {Allhotels.map((hotel, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col sm:flex-row hover:shadow-xl transition-shadow duration-300"
          >
            {/* Information Section */}
            <div className="flex-1 pl-0 sm:pl-6 mt-4 sm:mt-0">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-800">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {hotel.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <span className="block text-sm font-medium text-green-700 mb-1">
                    💰 Price
                  </span>
                  <span className="text-gray-800 text-sm">{hotel.price}</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <span className="block text-sm font-medium text-blue-700 mb-1">
                    ⭐ Rating
                  </span>
                  <span className="text-gray-800 text-sm">{hotel.rating}</span>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                  <span className="block text-sm font-medium text-purple-700 mb-1">
                    📍 Address
                  </span>
                  <span className="text-gray-800 text-sm">{hotel.address}</span>
                </div>
              </div>

              {/* Google Maps link */}
              <div className="mt-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                   
                      hotel.name ||
                       +
                        " " +
                        (
                          hotel.address ||
                         
                           
                          
                          "Address Not Available")
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium flex items-center gap-1 hover:underline text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 12.414A4 4 0 1116.657 9l4.243 4.243a4 4 0 01-3.243 3.414zM15 11a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotel;
