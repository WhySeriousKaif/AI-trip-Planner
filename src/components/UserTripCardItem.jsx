import React from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip, index = 0 }) => {
  const location = trip?.userSelection?.location?.label || "Unknown Location";
  const days = trip?.userSelection?.noOfDays || "N/A";
  const budget = trip?.userSelection?.budget || "N/A";

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="bg-white rounded-2xl shadow-md  sm:p-6 border border-gray-100 transition hover:shadow-lg hover:scale-[1.01] duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base">
            {index + 1}
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
              <span>📍</span> {location}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {days} day trip with {budget} budget
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 ">
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <p className="text-green-700 text-sm font-semibold flex items-center gap-1 mb-1">
              📅 Duration
            </p>
            <p className="text-gray-800 text-sm">{days} days</p>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <p className="text-purple-700 text-sm font-semibold flex items-center gap-1 mb-1">
              💰 Budget
            </p>
            <p className="text-gray-800 text-sm">{budget}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;