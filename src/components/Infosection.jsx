import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { Button } from "./ui/button";

const Infosection = ({ trip }) => {
  const [place, setPlace] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (trip) {
      const locationLabel = trip?.userSelection?.location?.label;
      if (locationLabel) {
        setPlace(locationLabel);
        handleSearch(locationLabel);
      }
    }
  }, [trip]);

  const handleSearch = async (searchPlace) => {
    if (!searchPlace) {
      setError("Place name is required.");
      return;
    }

    try {
      const response = await fetch("https://google.serper.dev/images", {
        method: "POST",
        headers: {
          "X-API-KEY": "d85a44f8bce30e1c1852c7e8fca338e5c718a87f",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: `${searchPlace} tourist place India`,
          gl: "in",
        }),
      });

      const result = await response.json();
      console.log(`Serper API Response for ${searchPlace}:`, result);

      // Check for images in the result
      if (result.images && result.images.length > 0) {
        setImageUrl(result.images[0].imageUrl);
        setError(null);
      } else {
        setImageUrl("");
        setError("No images found.");
      }
    } catch (err) {
      setError("Error fetching data.");
      console.error("Error:", err);
    }
  };

  // Add console.log to debug the data
  console.log("Trip data in TripInformation:", trip);

  // Helper function to get budget details
  const getBudgetDetails = (budgetType) => {
    switch (budgetType) {
      case "Budget":
        return "Approx. $50 - $100/day 💸";
      case "Moderate":
        return "Approx. $100 - $250/day 💰";
      case "Luxury":
        return "Approx. $250+/day 💎";
      default:
        return budgetType;
    }
  };

  return (
    <div className="flex flex-col gap-6  rounded-lg ">
      <div className="relative mt-2">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={place}
            className="h-[340px] w-full object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = "https://cdn.vectorstock.com/i/1000v/72/62/airplane-flying-above-the-earth-around-world-vector-40827262.jpg";
            }}
          />
        ) : (
          <img
            src="https://cdn.vectorstock.com/i/1000v/72/62/airplane-flying-above-the-earth-around-world-vector-40827262.jpg"
            alt="Travel"
            className="h-[340px] w-full object-cover rounded-lg shadow-md"
          />
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {trip?.userSelection?.location?.label || "Location Not Available"}
            </h2>
          </div>
          <div>
            <Button>
              <IoSend />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg">Duration</h3>
            <p className="text-gray-600">
              {trip?.userSelection?.noOfDays || "N/A"} days 📅
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg">Budget</h3>
            <p className="text-gray-600">
              {getBudgetDetails(trip?.userSelection?.budget) || "Not specified"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg">Travelers</h3>
            <p className="text-gray-600">
              {trip?.userSelection?.people || "N/A"} 🥂
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Infosection;