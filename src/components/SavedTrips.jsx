import React, { useState, useEffect } from "react";
import { db } from "../create-trip/fireBaseConfig";
import { getDocs, query, where, collection } from "firebase/firestore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./UserTripCardItem";
import Header from "@/components/custom/Header"; // Import the Header component
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

const SavedTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, authLoading } = useGoogleAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      toast.error("User not logged in or profile missing. Please sign in.");
      navigate("/create-trip");
      return;
    }

    getSavedTrips(user);
  }, [authLoading, user]);

  const getSavedTrips = async (user) => {
    try {
      const q = query(collection(db, "trips"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => doc.data());
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to fetch trips. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-100 to-blue-400">
      <Header /> {/* Ensure the Header is positioned at the top */}
      <div className="p-10 sm:px-10 md:px-32 xl:px-72 m-10 text-gray-800 font-semibold rounded-lg">
        <h1 className="text-bold text-2xl mb-10 text-center">My Trips</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-800">
          {userTrips.map((trip, index) => (
            <UserTripCardItem key={index} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedTrips;