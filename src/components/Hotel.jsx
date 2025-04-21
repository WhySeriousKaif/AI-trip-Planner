import React, { useEffect, useState } from "react";

const Hotel = ({ trip }) => {
  const [loading, setLoading] = useState(true);

  // Get hotels data
  const Allhotels = trip?.tripPlan?.travelPlan?.hotels ||

    trip?.tripPlan?.[0]?.hotels ||
    trip?.tripPlan?.[0]?.travel_plan?.hotels ||
    trip?.tripPlan?.[0]?.hotelOptions ||
    trip?.tripPlan?.[0]?.hotel_options ||
    trip?.tripPlan?.[0]?.travel_plan?.hotelOptions ||
    trip?.tripPlan?.[0]?.travel_plan?.recommended_hotels ||
    trip?.tripPlan?.hotel_recommendations ||
    trip?.tripPlan?.hotel_options ||
    trip?.tripPlan?.recommended_hotels ||
    trip?.tripPlan?.travel_plan?.hotels ||

    trip?.tripPlan?.[0]?.recommended_hotels ||
    trip?.tripPlan?.[0]?.hotel_recommendations ||
    trip?.tripPlan?.travel_plan?.hotels ||
    trip?.tripPlan?.hotel_recommendations ||
    trip?.tripPlan?.travel_plan?.recommended_hotels ||
    trip?.tripPlan?.travel_plan?.hotels ||
    trip?.tripPlan?.travel_plan?.hotel_recommendations ||
    trip?.tripPlan?.recommendedHotels ||
    trip?.tripPlan?.hotels ||
    trip?.tripPlan?.hotelRecommendations ||
    trip?.tripPlan?.[0]?.hotelRecommendations ||
    trip?.tripPlan?.[0]?.travelPlan?.hotelRecommendations ||
    trip?.tripPlan?.[0]?.travelPlan?.hotels ||
    trip?.tripPlan?.[0]?.hotels ||
    trip?.tripPlan?.[0]?.recommendedHotels ||
    trip?.tripPlan?.[0]?.hotels ||
    trip?.tripPlan?.travelPlan?.hotels ||
    trip?.tripPlan?.travelPlan?.hotelRecommendations ||
    trip?.tripPlan?.hotelRecommendations ||
    trip?.tripPlan?.recommendedHotels ||
    trip?.tripPlan?.hotels ||
    
    trip?.tripPlan?.trip_plan?.hotels ||
    trip?.tripPlan?.hotelOptions ||
    trip?.tripPlan?.travelPlan?.hotelOptions ||
    trip?.tripPlan?.travelPlan?.hotels ||
    trip?.tripPlan?.travelPlan?.hotelRecommendations ||
    trip?.tripPlan?.travelPlan?.recommendedHotels ||
    trip?.tripPlan?.travelPlan?.hotel_recommendations ||
    trip?.tripPlan?.travelPlan?.recommended_hotels ||
    trip?.tripPlan?.tripDetails?.hotels ||
    trip?.tripPlan?.tripDetails?.hotelOptions ||
    trip?.tripPlan?.tripDetails?.hotelRecommendations ||
    trip?.tripPlan?.tripDetails?.recommendedHotels ||
    trip?.tripPlan?.tripDetails?.hotel_recommendations ||
    trip?.tripPlan?.tripDetails?.recommended_hotels ||
    trip?.tripPlan?.tripDetails?.hotel_options ||
    
    [];
    console.log("Allhotels",Allhotels);

  useEffect(() => {
    setLoading(false);
  }, [trip, Allhotels]);

  // Render loading state
  if (!trip || loading) {
    return (
      <div className="mt-6 text-center">
        <h2 className="font-bold text-2xl mb-4 text-center">Hotel Recommendations</h2>
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
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        >
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-800">
                {hotel.hotelName || hotel.name || hotel["Hotel Name"] || hotel.hotel_name || hotel.hotelName|| hotel["Place Name"] || hotel.placeName || "Hotel Name Not Available"}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {hotel.description || hotel["Description"] || hotel.description || hotel["Place Details"] || hotel.placeDetails || "No description available"}
              </p>
            </div>
          </div>
  
          {/* Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-green-50 border border-green-100 rounded-lg p-3">
              <span className="block text-sm font-medium text-green-700 mb-1">💰 Price</span>
              <span className="text-gray-800 text-sm">
                {hotel.price || hotel["Price (in USD)"] || hotel.price || hotel["Price (in USD)"] || hotel.Price  || hotel["Price (in USD)"] || "Price Not Available"}
              </span>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <span className="block text-sm font-medium text-blue-700 mb-1">⭐ Rating</span>
              <span className="text-gray-800 text-sm">
                {hotel.rating || hotel["Rating (4 stars and above)"] || hotel.Rating || hotel["Rating (4 stars and above)"] || hotel.rating || hotel["Rating (4 stars and above)"] || "Rating Not Available"}
              </span>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
              <span className="block text-sm font-medium text-purple-700 mb-1">📍 Address</span>
              <span className="text-gray-800 text-sm">
                {hotel.hotelAddress || hotel.address || hotel["Address"] || hotel.address|| hotel.hotel_address || hotel.Address || hotel["Hotel Address"] || hotel.address|| hotel.hotel_address || "Address Not Available"}
              </span>
            </div>
          </div>
  
          {/* Google Maps link */}
          <div className="mt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                hotel.hotelName + " " + (hotel.hotelAddress || "")
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium flex items-center gap-1 hover:underline text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M17.657 16.657L13.414 12.414A4 4 0 1116.657 9l4.243 4.243a4 4 0 01-3.243 3.414zM15 11a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              View on Google Maps
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Hotel;