import React, { useState, useEffect } from "react";
import { db } from "../create-trip/fireBaseConfig";
import { getDocs, query, where, collection } from "firebase/firestore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./UserTripCardItem";

const SavedTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSavedTrips();
  }, []);

  const getSavedTrips = async () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (!user || !user.email) {
      toast.error("User not logged in or profile missing. Please sign in.");
      navigate("/login");
      return;
    }

    try {
      const q = query(collection(db, "trips"), where("userEmail", "==", user.email));
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => doc.data());
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to fetch trips. Please try again later.");
    }
  };

  return (
    <div className="p-10 sm:px-10 md:px-32 xl:px:72 m-10 text-gray-800 font-semibold bg-gradient-to-r from-blue-100 to-blue-400 rounded-lg">
      <h1 className="text-bold text-2xl mb-10 text-center">My Trips</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-800">
        {userTrips.map((trip, index) => (
          <UserTripCardItem key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default SavedTrips;