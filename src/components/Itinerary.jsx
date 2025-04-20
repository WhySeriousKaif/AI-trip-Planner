import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { fetchImagesForPlaces } from "@/components/services/imageService";
import { fetchImagesForHotels } from "@/components/services/serpApiService";

const Itinerary = ({ trip, initialImageUrls }) => {
  const [placeImages, setPlaceImages] = useState(initialImageUrls || {});
  const [loading, setLoading] = useState(true);

  const countryName = trip?.userSelection?.location?.label || "";

  const dailyItinerary = trip?.tripPlan?.[0]?.itinerary || [];
  console.log("dailyItinerary", dailyItinerary);

  useEffect(() => {
    const fetchImages = async () => {
      if (!dailyItinerary.length) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const places = dailyItinerary
          .flatMap(day => day.places || [])
          .map(place => place.place_name || place.placeName);
        const images = await fetchImagesForPlaces(places, countryName);
        setPlaceImages(images);
      } catch (error) {
        console.error("Error fetching place images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!initialImageUrls || Object.keys(initialImageUrls).length === 0) {
      fetchImages();
    }
  }, [dailyItinerary, trip]);

  if (loading) {
    return <div>Loading itinerary images...</div>;
  }

  if (!Array.isArray(dailyItinerary) || dailyItinerary.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="font-bold text-2xl mb-4">Itinerary</h2>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700">No itinerary available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-lg rounded-lg">
      <div className="p-6 mt-6">
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">
          Daily Itinerary
        </h2>
        <div className="grid gap-8 bg-gray-100">
          {dailyItinerary.map((day, dayIndex) =>
            (day.places || []).map((place, activityIndex) => {
              const placeName = place.place_name || place.placeName;
              const imageSrc =
                placeImages[placeName] ||
                "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg";

              return (
                <div
                  key={`${dayIndex}-${activityIndex}`}
                  className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={imageSrc}
                    alt={placeName}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.src = "/fallback-image.jpg";
                    }}
                  />
                  <div className="p-6 flex flex-col justify-between bg-gray-100">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Day {day.day_number || dayIndex + 1}:{" "}
                        {placeName || "Unknown Place"}
                      </h3>
                      <p className="text-gray-700 text-sm mb-3">
                        {place.place_details || place.placeDetails || "No description available"}
                      </p>

                      <div className="text-sm space-y-1">
                        <p className="text-green-700 font-medium">
                          🎟️ Ticket: {place.ticketPricing || "Not available"}
                        </p>
                        <p className="text-indigo-600 font-medium">
                          🕒 Best Time: {place.bestTimeToVisit || "Unknown"}
                        </p>
                        <p className="text-gray-600 font-medium">
                          🚗 Travel Time:{" "}
                          {place.time_to_spend || place.timeTravel || place.timeToSpend || "N/A"}
                        </p>
                      </div>
                    </div>

                    {placeName && (
                      <div className="flex items-center mt-5 text-sm text-blue-600 hover:underline">
                        <FaMapMarkerAlt className="mr-2" />
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${placeName}, ${countryName}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
