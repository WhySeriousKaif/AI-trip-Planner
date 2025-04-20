import React, { useEffect, useState } from "react";
import { fetchImagesForHotels } from "./services/serpApiService";

const Hotel = ({ trip }) => {
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  // Get hotels data
  const Allhotels = trip?.tripPlan?.travelPlan?.hotels ||
    trip?.tripPlan?.[0]?.hotels ||
    trip?.tripPlan?.[0]?.hotel_recommendations ||
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
    trip?.tripPlan?.[0]?.itinerary ||
    trip?.tripPlan?.[0]?.travelPlan?.itinerary ||
    trip?.tripPlan?.trip_plan?.hotels ||
    trip?.tripPlan?.hotelOptions ||
    trip?.tripPlan?.travelPlan?.hotelOptions ||
    trip?.tripPlan?.travelPlan?.hotels ||
    trip?.tripPlan?.travelPlan?.hotelRecommendations ||
    trip?.tripPlan?.travelPlan?.recommendedHotels ||
    trip?.tripPlan?.travelPlan?.hotel_recommendations ||
    trip?.tripPlan?.travelPlan?.recommended_hotels ||
    
    [];
    console.log( "Allhotels", Allhotels);

  useEffect(() => {
    const fetchImages = async () => {
      if (trip && Allhotels.length > 0) {
        setLoading(true);
        try {
          const location = trip?.userSelection?.location?.label;
          const hotelNames = Allhotels.map(hotel => hotel.hotelName);
          const images = await fetchImagesForHotels(hotelNames, location);
          setImageUrls(images);
        } catch (error) {
          console.error("Error fetching hotel images:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchImages();
  }, [trip, Allhotels]);

  // Render loading state
  if (!trip || loading) {
    return (
      <div className="mt-6">
        <h2 className="font-bold text-2xl mb-4">Hotel Recommendations</h2>
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mt-6">
        <h2 className="font-bold text-3xl mb-6 text-center text-gray-800">
          Hotel Recommendations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Allhotels.map((hotel, index) => {
            const imageUrl = imageUrls[hotel.hotelName] || 
                           hotel.hotelImageUrl || 
                           "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg";
            return (
              <div
                key={index}
                className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      hotel.hotelName + " " + (hotel.hotelAddress || "")
                    )}`,
                    "_blank"
                  )
                }
              >
                <img
                  src={imageUrl}
                  alt={hotel.hotelName}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg";
                  }}
                />
                <div className="p-6">
                  <h3 className="font-bold text-2xl mb-3 text-gray-900">
                    {hotel.hotelName || hotel.name || hotel["Hotel Name"] || hotel["Hotel Name"] || hotel["Name"] || hotel.hotel_name||"Hotel Name Not Available"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {hotel.hotelAddress || hotel.address || hotel["Hotel Address"] || hotel["Hotel Address"] || hotel["Address"] || hotel.hotel_address || "Address Not Available"}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-700 font-semibold">
                      {hotel.price || hotel["Price (in USD)"] || hotel["Price (in INR)"]||hotel.price_in_usd||hotel.price_range_inr || "Price Not Available"}
                    </p>
                    <p className="text-yellow-500">
                      {hotel.rating || hotel["Rating (4 stars and above)"] || "Rating Not Available"}
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-3">
                    {hotel.description || hotel["Description"] || "No description available "}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hotel;