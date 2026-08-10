import React from "react";
import { IoSend } from "react-icons/io5";
import { Button } from "./ui/button";
import { toast } from "sonner";
import ImageWithFallback from "@/components/custom/ImageWithFallback";

const HERO_FALLBACK_IMAGE =
  "https://cdn.vectorstock.com/i/1000v/72/62/airplane-flying-above-the-earth-around-world-vector-40827262.jpg";

const Infosection = ({ trip }) => {
  const place = trip?.userSelection?.location?.label || "";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my trip on WonderMate!',
        text: 'Here is the link to my trip itinerary.',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      toast.error("Sharing is not supported on this browser.");
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
        <ImageWithFallback
          src={trip?.tripPlan?.destinationImageUrl}
          fallbackSrc={HERO_FALLBACK_IMAGE}
          alt={place || "Travel"}
          className="h-[340px] w-full object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {trip?.userSelection?.location?.label || "Location Not Available"}
            </h2>
          </div>
          <div>
            <Button onClick={handleShare}>
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
    </div>
  );
};

export default Infosection;