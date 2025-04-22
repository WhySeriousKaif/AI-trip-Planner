import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { fetchImagesForPlaces } from "@/components/services/serpApiService"; // Ensure this import is correct

const Itinerary = ({ trip, initialImageUrls }) => {
  const [placeImages, setPlaceImages] = useState(initialImageUrls || {});
  const [loading, setLoading] = useState(false);

  const dailyItinerary =
    trip?.tripPlan?.itinerary?.[0]?.activities ||
    trip?.tripPlan?.[0]?.travel_plan?.itinerary ||
    trip?.tripPlan?.itinerary ||
    [];
    console.log("dailyItinerary",dailyItinerary);

  const tripLocation =
    trip?.userSelection?.location?.label || trip?.tripPlan?.[0]?.location || "Unknown Location";

  useEffect(() => {
    const fetchImages = async () => {
      if (dailyItinerary.length > 0) {
        setLoading(true);
        try {
          const allPlaces = dailyItinerary.flatMap((itineraryItem) =>
            (itineraryItem.activities || []).map(
              (place) =>
                place["Place Name"] ||
                place.place_name ||
                place.placeName ||
                "Unknown Place"
            )
          );
          const images = await fetchImagesForPlaces(allPlaces, tripLocation);
          setPlaceImages(images);
        } catch (error) {
          console.error("Error fetching place images:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!initialImageUrls || Object.keys(initialImageUrls).length === 0) {
      fetchImages();
    }
  }, [trip, dailyItinerary, initialImageUrls]);

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

  const renderPlaceCard = (place, index) => {
    const placeName = place["Place Name"] || place.place_name || place.placeName || "Unknown Place";
    const ticket = place["Ticket Pricing"] || place.ticketPricing || place.ticket_pricing || place.ticket || place.cost || "Not available";
    const bestTime = place["Best Time to Visit"] || place.bestTime || place.best_time || place.bestTimeToVisit || place.best_time_to_visit || place.visitTime || place.recommendedTime || "Unknown";
    const travelTime = place["Time Travel"] || place.travelTime || place.timeTravel || place.time_travel || place.timeToTravel || place.time_to_travel || place.estimatedTime || place.estimated_time || place.estimated_duration || place.duration || place.duration_in_hours || place.timeToReach || place.estimatedTimeSpent || "N/A";
    const description = place["Place Details"] || place.details || place.placeDetails || place.place_details || place.description || place.summary || "No description available";

    return (
      <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row hover:shadow-xl transition-shadow duration-300">
        {/* Placeholder for Image Section */}


        {/* Information Section */}
        <div className="flex-1 pl-0 sm:pl-6 mt-4 sm:mt-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold text-blue-800">{placeName}</h3>
          </div>
          <p className="text-gray-700 mt-2">{description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-4">
            <div className="bg-green-50 p-3 rounded-md border border-green-100">
              <span className="block text-sm font-medium text-green-700">🎟️ Ticket</span>
              <span className="text-gray-900">{ticket}</span>
            </div>
            <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100">
              <span className="block text-sm font-medium text-indigo-700">🕒 Best Time</span>
              <span className="text-gray-900">{bestTime}</span>
            </div>
            <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
              <span className="block text-sm font-medium text-purple-700">🚗 Travel Time</span>
              <span className="text-gray-900">{travelTime}</span>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${placeName}, ${tripLocation}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-blue-600 hover:underline"
          >
            <FaMapMarkerAlt className="mr-2" /> View on Google Maps
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-xl shadow-md mt-6">
      <h2 className="text-center text-3xl font-bold text-blue-900 mb-8">Your Travel Itinerary</h2>
      <p className="text-center text-gray-600 mb-10">Explore the beautiful destinations of {tripLocation}</p>
      <div className="space-y-10">
        {dailyItinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Day {dayIndex + 1}</h3>
            {(day.activities || day.places || day.schedule || [day]).map((place, index) => renderPlaceCard(place, index))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;